import type {
  ContactRecord,
  GiftCheckRecord,
  PeriodRecord,
  TransactionRecord,
} from "../shared/cse";

export interface SqlExecutor {
  query<T>(sql: string, params?: Record<string, unknown>): Promise<T[]>;
}

export interface DashboardSnapshot {
  transactions: TransactionRecord[];
  contacts: ContactRecord[];
  periods: PeriodRecord[];
  giftChecks: GiftCheckRecord[];
}

export const schemaSql = `
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('fournisseur', 'client', 'partenaire')),
  raison_sociale TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  téléphone TEXT NOT NULL,
  adresse TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS périodes (
  id TEXT PRIMARY KEY,
  libellé TEXT NOT NULL,
  date_début DATE NOT NULL,
  date_fin DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('semestriel', 'annuel')),
  statut TEXT NOT NULL CHECK (statut IN ('ouverte', 'clôturée', 'validée')),
  document_google_url TEXT
);

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  libellé TEXT NOT NULL,
  catégorie TEXT NOT NULL,
  compte TEXT NOT NULL CHECK (compte IN ('fonctionnement', 'asc')),
  montant NUMERIC(12,2) NOT NULL CHECK (montant <> 0),
  fournisseur_contact_id TEXT REFERENCES contacts(id),
  justificatif_id TEXT,
  statut TEXT NOT NULL CHECK (statut IN ('brouillon', 'validée', 'exportée')),
  commentaire TEXT NOT NULL DEFAULT '',
  créé_par TEXT NOT NULL,
  créé_le TIMESTAMP NOT NULL,
  modifié_par TEXT,
  modifié_le TIMESTAMP
);

CREATE TABLE IF NOT EXISTS justificatifs (
  id TEXT PRIMARY KEY,
  nom_fichier TEXT NOT NULL,
  url_stockage TEXT NOT NULL,
  type_fichier TEXT NOT NULL,
  transaction_id TEXT REFERENCES transactions(id) ON DELETE SET NULL,
  déposé_par TEXT NOT NULL,
  déposé_le TIMESTAMP NOT NULL
);

ALTER TABLE transactions
  ADD CONSTRAINT transactions_justificatif_fk
  FOREIGN KEY (justificatif_id) REFERENCES justificatifs(id);

CREATE TABLE IF NOT EXISTS chèques_cadeaux (
  id TEXT PRIMARY KEY,
  campagne TEXT NOT NULL,
  bénéficiaire TEXT NOT NULL,
  date DATE NOT NULL,
  montant NUMERIC(12,2) NOT NULL CHECK (montant > 0),
  motif TEXT NOT NULL,
  critère_attribution TEXT NOT NULL,
  justificatif_id TEXT REFERENCES justificatifs(id),
  statut TEXT NOT NULL CHECK (statut IN ('préparée', 'remise', 'annulée'))
);

CREATE INDEX IF NOT EXISTS idx_transactions_compte_date ON transactions (compte, date);
CREATE INDEX IF NOT EXISTS idx_transactions_justificatif ON transactions (justificatif_id);
CREATE INDEX IF NOT EXISTS idx_justificatifs_transaction ON justificatifs (transaction_id);
`;

export async function listDashboardSnapshot(executor: SqlExecutor): Promise<DashboardSnapshot> {
  const [transactions, contacts, periods, giftChecks] = await Promise.all([
    executor.query<TransactionRecord>("SELECT * FROM transactions ORDER BY date DESC LIMIT 100"),
    executor.query<ContactRecord>("SELECT * FROM contacts ORDER BY raison_sociale ASC"),
    executor.query<PeriodRecord>("SELECT * FROM périodes ORDER BY date_début DESC"),
    executor.query<GiftCheckRecord>("SELECT * FROM chèques_cadeaux ORDER BY date DESC"),
  ]);

  return { transactions, contacts, periods, giftChecks };
}

export async function upsertTransaction(executor: SqlExecutor, transaction: TransactionRecord): Promise<void> {
  await executor.query(
    `
      INSERT INTO transactions (
        id, date, libellé, catégorie, compte, montant, fournisseur_contact_id,
        justificatif_id, statut, commentaire, créé_par, créé_le, modifié_par, modifié_le
      )
      VALUES (
        :id, :date, :libellé, :catégorie, :compte, :montant, :fournisseur_contact_id,
        :justificatif_id, :statut, :commentaire, :créé_par, :créé_le, :modifié_par, :modifié_le
      )
      ON CONFLICT (id) DO UPDATE SET
        date = EXCLUDED.date,
        libellé = EXCLUDED.libellé,
        catégorie = EXCLUDED.catégorie,
        compte = EXCLUDED.compte,
        montant = EXCLUDED.montant,
        fournisseur_contact_id = EXCLUDED.fournisseur_contact_id,
        justificatif_id = EXCLUDED.justificatif_id,
        statut = EXCLUDED.statut,
        commentaire = EXCLUDED.commentaire,
        modifié_par = EXCLUDED.modifié_par,
        modifié_le = EXCLUDED.modifié_le
    `,
    transaction,
  );
}

export async function updatePeriodDocumentUrl(
  executor: SqlExecutor,
  periodId: string,
  documentUrl: string,
): Promise<void> {
  await executor.query(
    "UPDATE périodes SET document_google_url = :documentUrl WHERE id = :periodId",
    { documentUrl, periodId },
  );
}
