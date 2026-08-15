import { Info } from "lucide-react";
import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Alert } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Table, Td, Th } from "../components/ui/table";
import { formatCurrency, formatDate } from "../lib/format";
import { giftChecks } from "../lib/mock-data";

export default function ChequesCadeauxPage() {
  return (
    <AppShell
      activePage="Chèques cadeaux"
      title="Suivi chèques cadeaux"
      description="Campagnes ASC, bénéficiaires, critères d'attribution, statuts de remise et justificatifs associés."
    >
      <DemoNotice />
      <Alert tone="warning">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4" />
          <p>Rappel : vérifier les conditions d'exonération URSSAF applicables avant chaque campagne de chèques cadeaux.</p>
        </div>
      </Alert>
      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <CardTitle>Campagnes et remises</CardTitle>
            <CardDescription className="mt-1">Enregistrement des bénéficiaires, montants, motifs, critères et statuts.</CardDescription>
          </div>
          <Badge>{giftChecks.length} ligne(s)</Badge>
        </div>
        <Table>
          <thead>
            <tr>
              <Th>Campagne</Th>
              <Th>Bénéficiaire</Th>
              <Th>Date</Th>
              <Th>Montant</Th>
              <Th>Motif</Th>
              <Th>Critère</Th>
              <Th>Statut</Th>
            </tr>
          </thead>
          <tbody>
            {giftChecks.map((giftCheck) => (
              <tr key={giftCheck.id} className="border-t border-slate-100 dark:border-slate-800">
                <Td>{giftCheck.campagne}</Td>
                <Td>{giftCheck.bénéficiaire}</Td>
                <Td>{formatDate(giftCheck.date)}</Td>
                <Td>{formatCurrency(giftCheck.montant)}</Td>
                <Td>{giftCheck.motif}</Td>
                <Td>{giftCheck.critère_attribution}</Td>
                <Td><Badge>{giftCheck.statut}</Badge></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </AppShell>
  );
}
