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

ALTER TABLE transactions
  ADD CONSTRAINT transactions_justificatif_fk
  FOREIGN KEY (justificatif_id) REFERENCES justificatifs(id);

CREATE INDEX IF NOT EXISTS idx_transactions_compte_date ON transactions (compte, date);
CREATE INDEX IF NOT EXISTS idx_transactions_justificatif ON transactions (justificatif_id);
CREATE INDEX IF NOT EXISTS idx_justificatifs_transaction ON justificatifs (transaction_id);
