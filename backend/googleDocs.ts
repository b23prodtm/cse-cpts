import type { AccountSummary, PeriodRecord } from "../shared/cse";
import { formatAccountLabel } from "../frontend/lib/format";

export interface GoogleDocsClient {
  createDocument(title: string): Promise<{ documentId: string; documentUrl: string }>;
  replaceContent(documentId: string, content: string): Promise<void>;
}

function buildSection(label: string, summary: AccountSummary): string {
  return [
    label,
    `- Recettes : ${summary.recettes.toFixed(2)} EUR`,
    `- Dépenses : ${summary.dépenses.toFixed(2)} EUR`,
    `- Solde : ${summary.solde.toFixed(2)} EUR`,
    "",
  ].join("\n");
}

export async function createPeriodReport(
  client: GoogleDocsClient,
  period: PeriodRecord,
  fonctionnement: AccountSummary,
  asc: AccountSummary,
): Promise<string> {
  const title = `Bilan CSE — ${period.libellé}`;
  const { documentId, documentUrl } = await client.createDocument(title);
  const content = [
    title,
    "",
    `Période : ${period.date_début} au ${period.date_fin}`,
    "",
    buildSection(formatAccountLabel("fonctionnement"), fonctionnement),
    buildSection(formatAccountLabel("asc"), asc),
    "Outil d'organisation interne : une validation comptable et juridique reste nécessaire.",
  ].join("\n");

  await client.replaceContent(documentId, content);
  return documentUrl;
}
