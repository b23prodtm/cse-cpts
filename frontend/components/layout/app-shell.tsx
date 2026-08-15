import type { PropsWithChildren } from "react";
import { BookOpenText, BookText, Gift, LayoutDashboard, ReceiptText, Settings2, Users } from "lucide-react";
import { cn } from "../../lib/cn";

const navigation = [
  { label: "Tableau de bord", icon: LayoutDashboard },
  { label: "Écritures", icon: ReceiptText },
  { label: "Bilans", icon: BookText },
  { label: "Contacts", icon: Users },
  { label: "Chèques cadeaux", icon: Gift },
  { label: "Installation & connecteurs", icon: Settings2 },
  { label: "Aide & conformité", icon: BookOpenText },
];

interface AppShellProps extends PropsWithChildren {
  activePage: string;
  title: string;
  description: string;
}

export function AppShell({ activePage, children, title, description }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:w-72 lg:self-start">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Retool interne</p>
            <h1 className="mt-2 text-xl font-semibold">CSE Comptes</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Accès réservé aux utilisateurs authentifiés de l'organisation Retool.</p>
          </div>
          <nav className="space-y-1">
            {navigation.map((entry) => {
              const Icon = entry.icon;
              const isActive = entry.label === activePage;

              return (
                <div
                  key={entry.label}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100"
                      : "text-slate-600 dark:text-slate-300",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{entry.label}</span>
                </div>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 space-y-6">
          <header>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">{description}</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
