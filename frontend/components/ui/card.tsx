import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/cn";

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900", className)} {...props}>
      {children}
    </section>
  );
}

export function CardTitle({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2 className={cn("text-lg font-semibold text-slate-950 dark:text-white", className)} {...props}>
      {children}
    </h2>
  );
}

export function CardDescription({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cn("text-sm text-slate-600 dark:text-slate-300", className)} {...props}>
      {children}
    </p>
  );
}
