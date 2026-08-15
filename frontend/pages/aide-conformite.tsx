import { ExternalLink, ShieldCheck } from "lucide-react";
import { DemoNotice } from "../components/demo-notice";
import { AppShell } from "../components/layout/app-shell";
import { Alert } from "../components/ui/alert";
import { Card, CardDescription, CardTitle } from "../components/ui/card";

const references = [
  {
    title: "Code du travail, article L2312-78",
    description: "Subvention de fonctionnement du CSE.",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037388926",
  },
  {
    title: "Code du travail, article L2312-81",
    description: "Activités sociales et culturelles.",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037388934",
  },
  {
    title: "Code du travail, articles L2315-64 à L2315-77",
    description: "Obligations comptables selon la taille du CSE.",
    url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000037389809/",
  },
  {
    title: "Code du travail, articles D2315-33 et suivants",
    description: "Présentation simplifiée des comptes des CSE concernés.",
    url: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000037389877/",
  },
  {
    title: "RGPD — articles 5, 13 et 32",
    description: "Principes, information des personnes et sécurité du traitement.",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  },
  {
    title: "URSSAF",
    description: "Références pratiques pour les campagnes de chèques cadeaux.",
    url: "https://www.urssaf.fr/portail/home/employeur/avantages-en-nature-et-frais-pro/chques-cadeaux-et-bons-dachat.html",
  },
  {
    title: "CNIL",
    description: "Guides de conformité et sécurité des données personnelles.",
    url: "https://www.cnil.fr/",
  },
];

export default function AideConformitePage() {
  return (
    <AppShell
      activePage="Aide & conformité"
      title="Aide & conformité"
      description="Cadre juridique indicatif, sécurité des données et limites fonctionnelles de l'application."
    >
      <DemoNotice />

      <Alert tone="warning">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4" />
          <p>Ce logiciel ne remplace pas le conseil d'un expert-comptable, avocat ou conseil compétent.</p>
        </div>
      </Alert>

      <Card className="space-y-3">
        <CardTitle>Authentification et accès</CardTitle>
        <CardDescription>Utiliser exclusivement l'authentification native Retool et, si activée, la fédération Google Workspace avec MFA. Aucun mot de passe, SMS ou écran de connexion personnalisé ne doit être développé.</CardDescription>
      </Card>

      <Card>
        <CardTitle>Références juridiques indicatives</CardTitle>
        <div className="mt-4 grid gap-3">
          {references.map((reference) => (
            <a
              key={reference.title}
              href={reference.url}
              className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-500 dark:border-slate-800 dark:hover:border-emerald-700"
            >
              <div>
                <p className="font-medium">{reference.title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{reference.description}</p>
              </div>
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
            </a>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <CardTitle>Données personnelles et sécurité</CardTitle>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
          <li>Limiter les droits d'écriture par rôle Retool et conserver les données réelles dans des ressources privées approuvées.</li>
          <li>Ne jamais rendre publics les justificatifs stockés ; utiliser Retool Storage ou un stockage approuvé avec accès restreint.</li>
          <li>Conserver un journal simple des auteurs et dates de création / modification des écritures.</li>
          <li>Éviter toute donnée comptable réelle dans les exemples, démonstrations ou pages exposées publiquement.</li>
        </ul>
      </Card>
    </AppShell>
  );
}
