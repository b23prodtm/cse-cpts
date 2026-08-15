import type { LabelHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/cn";

export function Label({ children, className, ...props }: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label className={cn("text-sm font-medium text-slate-700 dark:text-slate-200", className)} {...props}>
      {children}
    </label>
  );
}
