import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Badge } from "../components/ui/badge";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Table, Td, Th } from "../components/ui/table";
import { contacts } from "../lib/mock-data";

export default function ContactsPage() {
  return (
    <AppShell
      activePage="Contacts"
      title="Contacts"
      description="Répertoire des fournisseurs, clients et partenaires, partageable uniquement aux membres autorisés de l'organisation Retool."
    >
      <DemoNotice />
      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <CardTitle>Répertoire</CardTitle>
            <CardDescription className="mt-1">Coordonnées utiles pour les écritures, bilans et campagnes ASC.</CardDescription>
          </div>
          <Badge>{contacts.length} contact(s)</Badge>
        </div>
        <Table>
          <thead>
            <tr>
              <Th>Raison sociale</Th>
              <Th>Type</Th>
              <Th>Contact</Th>
              <Th>Email</Th>
              <Th>Téléphone</Th>
              <Th>Adresse</Th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-slate-100 dark:border-slate-800">
                <Td>
                  <div className="font-medium">{contact.raison_sociale}</div>
                  <div className="text-xs text-slate-500">{contact.notes}</div>
                </Td>
                <Td>{contact.type}</Td>
                <Td>{contact.contact}</Td>
                <Td>{contact.email}</Td>
                <Td>{contact.téléphone}</Td>
                <Td>{contact.adresse}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </AppShell>
  );
}
