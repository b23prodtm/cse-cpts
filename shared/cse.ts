export type AccountCode = "fonctionnement" | "asc";
export type TransactionStatus = "brouillon" | "validée" | "exportée";
export type ContactType = "fournisseur" | "client" | "partenaire";
export type PeriodType = "semestriel" | "annuel";
export type PeriodStatus = "ouverte" | "clôturée" | "validée";
export type GiftCheckStatus = "préparée" | "remise" | "annulée";

export interface ContactRecord {
  id: string;
  type: ContactType;
  raison_sociale: string;
  contact: string;
  email: string;
  téléphone: string;
  adresse: string;
  notes: string;
}

export interface AttachmentRecord {
  id: string;
  nom_fichier: string;
  url_stockage: string;
  type_fichier: string;
  transaction_id: string | null;
  déposé_par: string;
  déposé_le: string;
}

export interface TransactionRecord {
  id: string;
  date: string;
  libellé: string;
  catégorie: string;
  compte: AccountCode;
  montant: number;
  fournisseur_contact_id: string | null;
  justificatif_id: string | null;
  statut: TransactionStatus;
  commentaire: string;
  créé_par: string;
  créé_le: string;
  modifié_par?: string;
  modifié_le?: string;
}

export interface PeriodRecord {
  id: string;
  libellé: string;
  date_début: string;
  date_fin: string;
  type: PeriodType;
  statut: PeriodStatus;
  document_google_url: string | null;
}

export interface GiftCheckRecord {
  id: string;
  campagne: string;
  bénéficiaire: string;
  date: string;
  montant: number;
  motif: string;
  critère_attribution: string;
  justificatif_id: string | null;
  statut: GiftCheckStatus;
}

export interface AccountSummary {
  compte: AccountCode;
  recettes: number;
  dépenses: number;
  solde: number;
}
