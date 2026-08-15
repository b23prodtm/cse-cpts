import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
