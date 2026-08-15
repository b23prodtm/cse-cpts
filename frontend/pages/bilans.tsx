import { FileText, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Alert } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Select } from "../components/ui/select";
import { formatAccountLabel, formatCurrency, formatDate } from "../lib/format";
import { periods, transactions } from "../lib/mock-data";
import type { AccountCode } from "../../shared/cse";

function summarizeForPeriod(periodId: string, account: AccountCode) {
  const period = periods.find((entry) => entry.id === periodId);
  const scopedTransactions = transactions.filter((transaction) => {
    if (!period) {
      return false;
    }

    return (
      transaction.compte === account &&
      transaction.date >= period.date_début &&
      transaction.date <= period.date_fin
    );
  });

  const recettes = scopedTransactions.filter((entry) => entry.montant > 0).reduce((sum, entry) => sum + entry.montant, 0);
  const dépenses = scopedTransactions.filter((entry) => entry.montant < 0).reduce((sum, entry) => sum + entry.montant, 0);

  return {
    recettes,
    dépenses,
    résultat: recettes + dépenses,
  };
}

export default function BilansPage() {
  const [periodId, setPeriodId] = useState(periods[0]?.id ?? "");
  const period = periods.find((entry) => entry.id === periodId) ?? periods[0]!;

  const fonctionnement = useMemo(() => summarizeForPeriod(periodId, "fonctionnement"), [periodId]);
  const asc = useMemo(() => summarizeForPeriod(periodId, "asc"), [periodId]);

  return (
    <AppShell
      activePage="Bilans"
      title="Bilans"
      description="Vue semestrielle ou annuelle des recettes, dépenses et résultats de chaque compte, avec export Google Docs et suivi de validation."
    >
      <DemoNotice />

      <Alert tone="warning">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-4 w-4" />
          <p>Les calculs et exports servent à l'organisation du CSE ; une validation comptable et juridique reste nécessaire avant diffusion ou dépôt.</p>
        </div>
      </Alert>

      <Card className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <CardTitle>Période de bilan</CardTitle>
          <CardDescription>Sélectionnez une période semestrielle ou annuelle.</CardDescription>
          <Select value={periodId} onChange={(event) => setPeriodId(event.target.value)} className="max-w-sm">
            {periods.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.libellé} · {entry.type}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Créer le bilan dans Google Docs
          </Button>
          <Button variant="outline">Mettre à jour le statut de validation</Button>
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        {[
          { label: "fonctionnement", summary: fonctionnement },
          { label: "asc", summary: asc },
        ].map((entry) => (
          <Card key={entry.label} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>{formatAccountLabel(entry.label as AccountCode)}</CardTitle>
                <CardDescription className="mt-1">{formatDate(period.date_début)} → {formatDate(period.date_fin)}</CardDescription>
              </div>
              <Badge>{period.statut}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric label="Recettes" value={formatCurrency(entry.summary.recettes)} />
              <Metric label="Dépenses" value={formatCurrency(entry.summary.dépenses)} />
              <Metric label="Résultat" value={formatCurrency(entry.summary.résultat)} />
            </div>
          </Card>
        ))}
      </section>

      <Card className="space-y-3">
        <CardTitle>Document Google Docs</CardTitle>
        <CardDescription>Le document doit être créé via une unique ressource Google Docs connectée au compte Google Workspace autorisé du CSE.</CardDescription>
        <div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-950/60 dark:text-slate-200">
          <p><span className="font-medium">Titre attendu :</span> Bilan CSE — {period.libellé}</p>
          <p><span className="font-medium">Lien actuel :</span> {period.document_google_url ?? "Aucun document créé pour cette période"}</p>
          <p><span className="font-medium">Partage :</span> l'utilisateur choisit ensuite les autorisations de partage directement dans Google Workspace.</p>
        </div>
      </Card>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="text-sm text-slate-600 dark:text-slate-300">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}
