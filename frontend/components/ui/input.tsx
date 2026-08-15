import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-0 transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}
