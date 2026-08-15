import type { HTMLAttributes, PropsWithChildren, TableHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export function Table({ className, children, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function Th({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th className={cn("px-3 py-3 text-left font-medium text-slate-500 dark:text-slate-300", className)} {...props}>
      {children}
    </th>
  );
}

export function Td({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td className={cn("px-3 py-3 align-top text-slate-700 dark:text-slate-200", className)} {...props}>
      {children}
    </td>
  );
}
