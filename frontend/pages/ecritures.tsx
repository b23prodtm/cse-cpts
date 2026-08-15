import { AlertTriangle, FileUp, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Alert } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Table, Td, Th } from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";
import { formatAccountLabel, formatCurrency, formatDate } from "../lib/format";
import { attachments, categoriesByAccount, contacts, getMissingReceiptTransactions, periods, transactions } from "../lib/mock-data";
import type { AccountCode } from "../../shared/cse";

interface TransactionDraft {
  date: string;
  libellé: string;
  montant: string;
  compte: AccountCode;
  catégorie: string;
  contact: string;
  commentaire: string;
}

const defaultDraft: TransactionDraft = {
  date: "2026-06-30",
  libellé: "",
  montant: "",
  compte: "fonctionnement",
  catégorie: categoriesByAccount.fonctionnement[0]!,
  contact: "",
  commentaire: "",
};

export default function EcrituresPage() {
  const [accountFilter, setAccountFilter] = useState<"tous" | AccountCode>("tous");
  const [periodFilter, setPeriodFilter] = useState(periods[0]?.id ?? "");
  const [categoryFilter, setCategoryFilter] = useState("toutes");
  const [missingOnly, setMissingOnly] = useState(false);
  const [draft, setDraft] = useState<TransactionDraft>(defaultDraft);

  const filteredTransactions = useMemo(() => {
    const selectedPeriod = periods.find((period) => period.id === periodFilter);

    return transactions.filter((transaction) => {
      const matchesAccount = accountFilter === "tous" || transaction.compte === accountFilter;
      const matchesCategory = categoryFilter === "toutes" || transaction.catégorie === categoryFilter;
      const matchesReceipt = !missingOnly || (transaction.montant < 0 && !transaction.justificatif_id);
      const matchesPeriod =
        !selectedPeriod ||
        (transaction.date >= selectedPeriod.date_début && transaction.date <= selectedPeriod.date_fin);

      return matchesAccount && matchesCategory && matchesReceipt && matchesPeriod;
    });
  }, [accountFilter, categoryFilter, missingOnly, periodFilter]);

  const availableCategories = useMemo(() => {
    if (accountFilter === "tous") {
      return [...new Set(Object.values(categoriesByAccount).flat())];
    }

    return categoriesByAccount[accountFilter];
  }, [accountFilter]);

  return (
    <AppShell
      activePage="Écritures"
      title="Écritures"
      description="Saisie, modification, filtres et contrôle des justificatifs pour chaque écriture, avec un montant signé et une affectation à un seul compte."
    >
      <DemoNotice />

      <Alert tone="warning">
        Confidentialité : avant d'ajouter un justificatif contenant des données personnelles, informez les personnes concernées et appliquez les règles RGPD de conservation et d'accès.
      </Alert>

      <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="space-y-4">
          <div>
            <CardTitle>Filtres</CardTitle>
            <CardDescription className="mt-1">Compte, période, catégorie et justificatif manquant.</CardDescription>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="compte-filter">Compte</Label>
              <Select id="compte-filter" value={accountFilter} onChange={(event) => setAccountFilter(event.target.value as "tous" | AccountCode)}>
                <option value="tous">Tous</option>
                <option value="fonctionnement">Fonctionnement</option>
                <option value="asc">Œuvres sociales / ASC</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="periode-filter">Période</Label>
              <Select id="periode-filter" value={periodFilter} onChange={(event) => setPeriodFilter(event.target.value)}>
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.libellé}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorie-filter">Catégorie</Label>
              <Select id="categorie-filter" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                <option value="toutes">Toutes</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="justificatif-filter">Justificatif</Label>
              <Select id="justificatif-filter" value={missingOnly ? "manquant" : "tous"} onChange={(event) => setMissingOnly(event.target.value === "manquant")}>
                <option value="tous">Tous</option>
                <option value="manquant">Justificatif manquant</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Filter className="h-4 w-4" />
            {filteredTransactions.length} écriture(s) affichée(s)
          </div>
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Libellé</Th>
                <Th>Catégorie</Th>
                <Th>Compte</Th>
                <Th>Statut</Th>
                <Th>Justificatif</Th>
                <Th className="text-right">Montant</Th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => {
                const attachment = attachments.find((item) => item.id === transaction.justificatif_id);
                return (
                  <tr key={transaction.id} className="border-t border-slate-100 dark:border-slate-800">
                    <Td>{formatDate(transaction.date)}</Td>
                    <Td>
                      <div className="font-medium">{transaction.libellé}</div>
                      <div className="text-xs text-slate-500">Créée par {transaction.créé_par}</div>
                    </Td>
                    <Td>{transaction.catégorie}</Td>
                    <Td>{formatAccountLabel(transaction.compte)}</Td>
                    <Td>
                      <Badge>{transaction.statut}</Badge>
                    </Td>
                    <Td>{attachment?.nom_fichier ?? "À ajouter"}</Td>
                    <Td className="text-right font-medium">{formatCurrency(transaction.montant)}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>

        <Card className="space-y-4">
          <div>
            <CardTitle>Nouvelle écriture</CardTitle>
            <CardDescription className="mt-1">Le montant doit être positif pour une recette et négatif pour une dépense.</CardDescription>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={draft.date} onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="montant">Montant signé</Label>
              <Input id="montant" type="number" step="0.01" value={draft.montant} onChange={(event) => setDraft((current) => ({ ...current, montant: event.target.value }))} placeholder="Ex. -120.00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="libelle">Libellé</Label>
              <Input id="libelle" value={draft.libellé} onChange={(event) => setDraft((current) => ({ ...current, libellé: event.target.value }))} placeholder="Décrivez l'opération" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compte">Compte</Label>
              <Select
                id="compte"
                value={draft.compte}
                onChange={(event) => {
                  const nextAccount = event.target.value as AccountCode;
                  setDraft((current) => ({
                    ...current,
                    compte: nextAccount,
                    catégorie: categoriesByAccount[nextAccount][0]!,
                  }));
                }}
              >
                <option value="fonctionnement">Fonctionnement</option>
                <option value="asc">Œuvres sociales / ASC</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorie">Catégorie</Label>
              <Select id="categorie" value={draft.catégorie} onChange={(event) => setDraft((current) => ({ ...current, catégorie: event.target.value }))}>
                {categoriesByAccount[draft.compte].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact">Contact</Label>
              <Select id="contact" value={draft.contact} onChange={(event) => setDraft((current) => ({ ...current, contact: event.target.value }))}>
                <option value="">Aucun contact</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.raison_sociale} — {contact.contact}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="commentaire">Commentaire</Label>
              <Textarea id="commentaire" value={draft.commentaire} onChange={(event) => setDraft((current) => ({ ...current, commentaire: event.target.value }))} placeholder="Contrôle interne, point d'attention, rappel juridique…" />
            </div>
          </div>
          <Alert tone="warning">
            <div className="flex items-start gap-3">
              <FileUp className="mt-0.5 h-4 w-4" />
              <p>Téléversement attendu depuis mobile ou desktop via Retool Storage, avec conservation privée du fichier et enregistrement du lien en base.</p>
            </div>
          </Alert>
          <div className="flex flex-wrap gap-3">
            <Button>Créer l'écriture</Button>
            <Button variant="outline">Ajouter un justificatif</Button>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <CardTitle>Alertes justificatifs</CardTitle>
            <CardDescription className="mt-1">Une dépense sans justificatif doit être signalée avant validation.</CardDescription>
          </div>
          <Badge>{getMissingReceiptTransactions().length} alerte(s)</Badge>
        </div>
        <div className="grid gap-3">
          {getMissingReceiptTransactions().map((transaction) => (
            <Alert key={transaction.id} tone="warning">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="font-medium">{transaction.libellé}</p>
                  <p>{formatDate(transaction.date)} · {formatAccountLabel(transaction.compte)} · {formatCurrency(transaction.montant)}</p>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
