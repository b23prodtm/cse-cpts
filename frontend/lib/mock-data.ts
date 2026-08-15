import type {
  AccountCode,
  AccountSummary,
  AttachmentRecord,
  ContactRecord,
  GiftCheckRecord,
  PeriodRecord,
  TransactionRecord,
} from "../../shared/cse";

export const categoriesByAccount: Record<AccountCode, string[]> = {
  fonctionnement: [
    "Subvention employeur",
    "Assurances",
    "Protection juridique",
    "Avocat",
    "Frais bancaires",
    "Formation",
    "Outils administratifs",
  ],
  asc: [
    "Redevance distributeurs automatiques",
    "Chèques cadeaux",
    "Activités",
    "Avantages salariés",
  ],
};

export const contacts: ContactRecord[] = [
  {
    id: "ct-001",
    type: "fournisseur",
    raison_sociale: "Banque Coopérative Locale",
    contact: "Camille Martin",
    email: "camille.martin@example.test",
    téléphone: "01 84 00 00 01",
    adresse: "12 rue de la Trésorerie, 75011 Paris",
    notes: "Convention frais bancaires annuelle.",
  },
  {
    id: "ct-002",
    type: "partenaire",
    raison_sociale: "Pause & Café Services",
    contact: "Inès Robert",
    email: "ines.robert@example.test",
    téléphone: "01 84 00 00 02",
    adresse: "8 avenue des Salariés, 69003 Lyon",
    notes: "Redevance trimestrielle liée aux distributeurs.",
  },
  {
    id: "ct-003",
    type: "fournisseur",
    raison_sociale: "Culture Loisirs France",
    contact: "Yanis Morel",
    email: "yanis.morel@example.test",
    téléphone: "01 84 00 00 03",
    adresse: "5 place des Activités, 31000 Toulouse",
    notes: "Prestataire sorties et billetterie.",
  },
];

export const attachments: AttachmentRecord[] = [
  {
    id: "pj-001",
    nom_fichier: "releve-frais-bancaires-janvier.pdf",
    url_stockage: "retool-storage://justificatifs/pj-001",
    type_fichier: "application/pdf",
    transaction_id: "tr-002",
    déposé_par: "alice.tresoriere@cse.example",
    déposé_le: "2026-01-16T10:20:00.000Z",
  },
  {
    id: "pj-002",
    nom_fichier: "campagne-cheques-cadeaux-printemps.jpg",
    url_stockage: "retool-storage://justificatifs/pj-002",
    type_fichier: "image/jpeg",
    transaction_id: "tr-004",
    déposé_par: "alice.tresoriere@cse.example",
    déposé_le: "2026-03-25T15:42:00.000Z",
  },
];

export const periods: PeriodRecord[] = [
  {
    id: "per-2026-s1",
    libellé: "1er semestre 2026",
    date_début: "2026-01-01",
    date_fin: "2026-06-30",
    type: "semestriel",
    statut: "ouverte",
    document_google_url: null,
  },
  {
    id: "per-2025-annuel",
    libellé: "Exercice 2025",
    date_début: "2025-01-01",
    date_fin: "2025-12-31",
    type: "annuel",
    statut: "validée",
    document_google_url: "https://docs.google.com/document/d/exemple-bilan-2025",
  },
];

export const transactions: TransactionRecord[] = [
  {
    id: "tr-001",
    date: "2026-01-05",
    libellé: "Subvention employeur T1",
    catégorie: "Subvention employeur",
    compte: "fonctionnement",
    montant: 4200,
    fournisseur_contact_id: null,
    justificatif_id: null,
    statut: "validée",
    commentaire: "Le taux de subvention reste paramétrable selon l'effectif.",
    créé_par: "alice.tresoriere@cse.example",
    créé_le: "2026-01-05T09:00:00.000Z",
    modifié_par: "alice.tresoriere@cse.example",
    modifié_le: "2026-01-05T09:00:00.000Z",
  },
  {
    id: "tr-002",
    date: "2026-01-15",
    libellé: "Frais bancaires mensuels",
    catégorie: "Frais bancaires",
    compte: "fonctionnement",
    montant: -32.5,
    fournisseur_contact_id: "ct-001",
    justificatif_id: "pj-001",
    statut: "validée",
    commentaire: "Débit automatique du compte de fonctionnement.",
    créé_par: "alice.tresoriere@cse.example",
    créé_le: "2026-01-15T08:15:00.000Z",
    modifié_par: "marc.elu@cse.example",
    modifié_le: "2026-01-16T08:15:00.000Z",
  },
  {
    id: "tr-003",
    date: "2026-03-10",
    libellé: "Redevance distributeurs automatiques T1",
    catégorie: "Redevance distributeurs automatiques",
    compte: "asc",
    montant: 640,
    fournisseur_contact_id: "ct-002",
    justificatif_id: null,
    statut: "brouillon",
    commentaire: "Recette ASC liée aux distributeurs de café.",
    créé_par: "alice.tresoriere@cse.example",
    créé_le: "2026-03-10T11:00:00.000Z",
  },
  {
    id: "tr-004",
    date: "2026-03-24",
    libellé: "Campagne chèques cadeaux printemps",
    catégorie: "Chèques cadeaux",
    compte: "asc",
    montant: -1800,
    fournisseur_contact_id: "ct-003",
    justificatif_id: "pj-002",
    statut: "validée",
    commentaire: "Vérifier les conditions d'exonération URSSAF avant validation finale.",
    créé_par: "alice.tresoriere@cse.example",
    créé_le: "2026-03-24T14:30:00.000Z",
    modifié_par: "alice.tresoriere@cse.example",
    modifié_le: "2026-03-25T07:50:00.000Z",
  },
  {
    id: "tr-005",
    date: "2026-04-12",
    libellé: "Assurance responsabilité civile",
    catégorie: "Assurances",
    compte: "fonctionnement",
    montant: -210,
    fournisseur_contact_id: null,
    justificatif_id: null,
    statut: "brouillon",
    commentaire: "Justificatif manquant pour démonstration.",
    créé_par: "alice.tresoriere@cse.example",
    créé_le: "2026-04-12T13:45:00.000Z",
  },
];

export const giftChecks: GiftCheckRecord[] = [
  {
    id: "cc-001",
    campagne: "Printemps 2026",
    bénéficiaire: "Équipe logistique",
    date: "2026-03-24",
    montant: 900,
    motif: "Pouvoir d'achat",
    critère_attribution: "Salariés présents au 1er mars 2026",
    justificatif_id: "pj-002",
    statut: "remise",
  },
  {
    id: "cc-002",
    campagne: "Rentrée 2026",
    bénéficiaire: "Salariés avec enfant scolarisé",
    date: "2026-08-20",
    montant: 600,
    motif: "Rentrée scolaire",
    critère_attribution: "Déclaration sur l'honneur et justificatif de scolarité",
    justificatif_id: null,
    statut: "préparée",
  },
];

export function getCurrentPeriod(): PeriodRecord {
  return periods.find((period) => period.statut === "ouverte") ?? periods[0]!;
}

export function getAccountSummary(account: AccountCode, data: TransactionRecord[] = transactions): AccountSummary {
  const matching = data.filter((transaction) => transaction.compte === account);
  const recettes = matching.filter((entry) => entry.montant > 0).reduce((sum, entry) => sum + entry.montant, 0);
  const dépenses = matching.filter((entry) => entry.montant < 0).reduce((sum, entry) => sum + entry.montant, 0);

  return {
    compte: account,
    recettes,
    dépenses,
    solde: recettes + dépenses,
  };
}

export function getGlobalTreasury(): number {
  return transactions.reduce((sum, transaction) => sum + transaction.montant, 0);
}

export function getMissingReceiptTransactions(): TransactionRecord[] {
  return transactions.filter((transaction) => transaction.montant < 0 && !transaction.justificatif_id);
}
