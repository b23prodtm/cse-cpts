import { Database, HardDriveUpload, ShieldCheck, Workflow } from "lucide-react";
import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Alert } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Card, CardDescription, CardTitle } from "../components/ui/card";

const connectors = [
  {
    name: "Retool Database / PostgreSQL",
    resourceName: "retool_db_or_postgres",
    icon: Database,
    goal: "Stocker durablement transactions, contacts, justificatifs, chèques cadeaux et périodes.",
    steps: [
      "Créer une ressource Retool Database ou connecter une ressource PostgreSQL privée déjà approuvée.",
      "Enregistrer la ressource sous le nom interne recommandé « retool_db_or_postgres ».",
      "Exécuter le script /home/runner/work/cse-cpts/cse-cpts/backend/schema.sql pour créer les tables.",
      "Réserver les droits d'écriture aux rôles Trésorier / Trésorière et Administrateur.",
    ],
  },
  {
    name: "Retool Storage",
    resourceName: "retool_storage_private",
    icon: HardDriveUpload,
    goal: "Conserver les PDF et photos de justificatifs en accès privé, y compris depuis mobile.",
    steps: [
      "Activer Retool Storage ou un stockage approuvé avec accès privé uniquement.",
      "Enregistrer la ressource sous le nom interne recommandé « retool_storage_private ».",
      "Créer un dossier logique « justificatifs » et refuser tout partage public des fichiers.",
      "Vérifier le téléversement depuis mobile et desktop avant mise en production.",
    ],
  },
  {
    name: "Google Docs / Google Workspace",
    resourceName: "google_workspace_cse_docs",
    icon: Workflow,
    goal: "Créer le document « Bilan CSE — [période] » et enregistrer son URL dans la période.",
    steps: [
      "Connecter une unique ressource Google Docs avec le compte Google Workspace autorisé du CSE.",
      "Enregistrer la ressource sous le nom interne recommandé « google_workspace_cse_docs ».",
      "Ne jamais stocker de mot de passe, jeton ou identifiant Google dans le frontend ou le dépôt.",
      "Laisser l'utilisateur gérer ensuite le partage du document directement dans Google Workspace.",
    ],
  },
];

export default function InstallationConnecteursPage() {
  return (
    <AppShell
      activePage="Installation & connecteurs"
      title="Installation & connecteurs"
      description="Guide d'installation Retool et liste des connecteurs à enregistrer pour activer la base, le stockage privé et Google Workspace."
    >
      <DemoNotice />

      <Alert tone="warning">
        Cette page décrit les connecteurs à enregistrer dans Retool. Elle ne crée aucun accès public, aucune inscription et aucune connexion personnalisée.
      </Alert>

      <section className="grid gap-4 xl:grid-cols-3">
        {connectors.map((connector) => {
          const Icon = connector.icon;

          return (
            <Card key={connector.resourceName} className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{connector.name}</CardTitle>
                  <CardDescription className="mt-1">{connector.goal}</CardDescription>
                </div>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">Connecteur à enregistrer</p>
                <Badge>{connector.resourceName}</Badge>
              </div>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                {connector.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Card>
          );
        })}
      </section>

      <Card className="space-y-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
          <div>
            <CardTitle>Ordre recommandé d'installation</CardTitle>
            <CardDescription className="mt-1">
              Connecter d'abord la base, ensuite le stockage privé, puis Google Workspace pour le bouton de bilan.
            </CardDescription>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <StepCard index="1" title="Base de données" description="Créer la ressource, exécuter le schéma SQL, tester les droits d'écriture." />
          <StepCard index="2" title="Stockage privé" description="Configurer le dépôt des justificatifs et vérifier l'accès mobile sécurisé." />
          <StepCard index="3" title="Workspace" description="Connecter Google Docs, tester la création d'un bilan et enregistrer l'URL du document." />
        </div>
      </Card>
    </AppShell>
  );
}

function StepCard({ description, index, title }: { description: string; index: string; title: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Étape {index}</p>
      <h3 className="mt-2 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
