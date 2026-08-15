import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/cn";

export function Badge({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200", className)} {...props}>
      {children}
    </span>
  );
}
