import type { AccountCode, AccountSummary, PeriodRecord, TransactionRecord } from "../shared/cse";
import { listDashboardSnapshot, type SqlExecutor, updatePeriodDocumentUrl, upsertTransaction } from "./db";
import type { GoogleDocsClient } from "./googleDocs";
import { createPeriodReport } from "./googleDocs";
import type { BackendContext } from "./resources";

export function summarizeTransactions(transactions: TransactionRecord[], account: AccountCode): AccountSummary {
  const scoped = transactions.filter((transaction) => transaction.compte === account);
  const recettes = scoped.filter((transaction) => transaction.montant > 0).reduce((sum, transaction) => sum + transaction.montant, 0);
  const dépenses = scoped.filter((transaction) => transaction.montant < 0).reduce((sum, transaction) => sum + transaction.montant, 0);

  return {
    compte: account,
    recettes,
    dépenses,
    solde: recettes + dépenses,
  };
}

export async function saveTransaction(
  executor: SqlExecutor,
  context: BackendContext,
  draft: Omit<TransactionRecord, "créé_par" | "créé_le" | "modifié_par" | "modifié_le">,
): Promise<void> {
  const now = context.now;
  await upsertTransaction(executor, {
    ...draft,
    créé_par: context.actorEmail,
    créé_le: now,
    modifié_par: context.actorEmail,
    modifié_le: now,
  });
}

export async function createGoogleDocsReportForPeriod(
  executor: SqlExecutor,
  googleDocs: GoogleDocsClient,
  period: PeriodRecord,
): Promise<string> {
  const snapshot = await listDashboardSnapshot(executor);
  const scopedTransactions = snapshot.transactions.filter(
    (transaction) => transaction.date >= period.date_début && transaction.date <= period.date_fin,
  );
  const fonctionnement = summarizeTransactions(scopedTransactions, "fonctionnement");
  const asc = summarizeTransactions(scopedTransactions, "asc");
  const documentUrl = await createPeriodReport(googleDocs, period, fonctionnement, asc);
  await updatePeriodDocumentUrl(executor, period.id, documentUrl);
  return documentUrl;
}
