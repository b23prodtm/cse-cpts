import type { ReactNode } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}

export function StatCard({ helper, icon, label, value }: StatCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <CardDescription>{label}</CardDescription>
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100">{icon}</div>
      </div>
      <CardTitle className="text-2xl">{value}</CardTitle>
      <p className="text-sm text-slate-600 dark:text-slate-300">{helper}</p>
    </Card>
  );
}
