import { ArrowDownCircle, ArrowUpCircle, Landmark, NotebookPen, Receipt, Users } from "lucide-react";
import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Table, Td, Th } from "../components/ui/table";
import { formatAccountLabel, formatCurrency, formatDate } from "../lib/format";
import { attachments, getAccountSummary, getCurrentPeriod, getGlobalTreasury, transactions } from "../lib/mock-data";
import { StatCard } from "../components/stat-card";

const currentPeriod = getCurrentPeriod();
const fonctionnement = getAccountSummary("fonctionnement");
const asc = getAccountSummary("asc");
const latestTransactions = [...transactions].sort((left, right) => right.date.localeCompare(left.date)).slice(0, 5);

const actions = [
  "Nouvelle écriture",
  "Ajouter un justificatif",
  "Éditer le bilan",
  "Bilan annuel",
  "Contacts",
  "Suivi chèques cadeaux",
];

export default function DashboardPage() {
  return (
    <AppShell
      activePage="Tableau de bord"
      title="Tableau de bord"
      description="Suivi simplifié de trésorerie du CSE, sans TVA, avec séparation stricte entre le budget de fonctionnement et celui des œuvres sociales / ASC."
    >
      <DemoNotice />

      <Card className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardDescription>Date d'arrêté de la période</CardDescription>
          <CardTitle className="mt-1">{formatDate(currentPeriod.date_fin)}</CardTitle>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{currentPeriod.libellé} · statut {currentPeriod.statut}</p>
        </div>
        <Badge>Validation comptable/juridique externe recommandée</Badge>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={<Landmark className="h-5 w-5" />} label="Solde fonctionnement" value={formatCurrency(fonctionnement.solde)} helper={`${formatCurrency(fonctionnement.recettes)} de recettes · ${formatCurrency(fonctionnement.dépenses)} de dépenses`} />
        <StatCard icon={<ArrowDownCircle className="h-5 w-5" />} label="Solde œuvres sociales / ASC" value={formatCurrency(asc.solde)} helper={`${formatCurrency(asc.recettes)} de recettes · ${formatCurrency(asc.dépenses)} de dépenses`} />
        <StatCard icon={<ArrowUpCircle className="h-5 w-5" />} label="Trésorerie totale" value={formatCurrency(getGlobalTreasury())} helper="Outil d'organisation interne, sans calcul ni déclaration de TVA." />
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.4fr,0.8fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <CardTitle>Dernières écritures</CardTitle>
              <CardDescription className="mt-1">Date, libellé, catégorie, compte, justificatif et montant.</CardDescription>
            </div>
            <Badge>{latestTransactions.length} affichées</Badge>
          </div>
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Libellé</Th>
                <Th>Catégorie</Th>
                <Th>Compte</Th>
                <Th>Justificatif</Th>
                <Th className="text-right">Montant</Th>
              </tr>
            </thead>
            <tbody>
              {latestTransactions.map((transaction) => {
                const attachment = attachments.find((item) => item.id === transaction.justificatif_id);
                return (
                  <tr key={transaction.id} className="border-t border-slate-100 dark:border-slate-800">
                    <Td>{formatDate(transaction.date)}</Td>
                    <Td>{transaction.libellé}</Td>
                    <Td>{transaction.catégorie}</Td>
                    <Td>{formatAccountLabel(transaction.compte)}</Td>
                    <Td>{attachment ? attachment.nom_fichier : "À ajouter"}</Td>
                    <Td className="text-right font-medium">{formatCurrency(transaction.montant)}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardTitle>Actions visibles</CardTitle>
          <CardDescription className="mt-1">Raccourcis destinés aux utilisateurs autorisés par rôle Retool.</CardDescription>
          <div className="mt-4 grid gap-3">
            {actions.map((action) => (
              <Button key={action} variant="outline" className="justify-start">
                {action}
              </Button>
            ))}
          </div>
          <div className="mt-6 grid gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <div className="flex items-start gap-3">
              <Receipt className="mt-0.5 h-4 w-4 text-emerald-600" />
              <p className="text-sm text-slate-700 dark:text-slate-200">Le taux de subvention de fonctionnement reste paramétrable selon l'effectif : 0,20 % entre 50 et moins de 2 000 salariés, 0,22 % à partir de 2 000 salariés.</p>
            </div>
            <div className="flex items-start gap-3">
              <NotebookPen className="mt-0.5 h-4 w-4 text-emerald-600" />
              <p className="text-sm text-slate-700 dark:text-slate-200">Le bouton de bilan Google Docs doit utiliser une ressource Google Workspace dédiée, sans mot de passe ni jeton en frontend.</p>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-4 w-4 text-emerald-600" />
              <p className="text-sm text-slate-700 dark:text-slate-200">Les comptes individuels Retool gèrent l'accès : aucune invitation publique, aucune authentification personnalisée.</p>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
