import type { AccountCode } from "../../shared/cse";

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatCurrency(value: number): string {
  return euroFormatter.format(value);
}

export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function formatAccountLabel(account: AccountCode): string {
  return account === "fonctionnement" ? "Fonctionnement" : "Œuvres sociales / ASC";
}
