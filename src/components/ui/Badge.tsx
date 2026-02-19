import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import type { ToolStatus } from "@/lib/domain/types";

export type BadgeVariant = ToolStatus;

export const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-strong text-text-muted",
  live: "border border-orange-400/30 bg-orange-500/10 text-orange-300",
  beta: "border border-sky-400/30 bg-sky-500/10 text-sky-300",
  experimental: "border border-violet-400/30 bg-violet-500/10 text-violet-300"
};

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]",
        badgeVariantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
