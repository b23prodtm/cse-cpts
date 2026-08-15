import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/cn";

interface AlertProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  tone?: "info" | "warning";
}

const tones = {
  info: "border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100",
  warning: "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100",
};

export function Alert({ children, className, tone = "info", ...props }: AlertProps) {
  return (
    <div className={cn("rounded-xl border p-4 text-sm", tones[tone], className)} {...props}>
      {children}
    </div>
  );
}
