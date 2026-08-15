import { Alert } from "./ui/alert";

export function DemoNotice() {
  return (
    <Alert tone="info">
      Mode démonstration : les données affichées sont fictives et doivent être remplacées par Retool Database, Retool Storage et Google Docs avant usage réel.
    </Alert>
  );
}
