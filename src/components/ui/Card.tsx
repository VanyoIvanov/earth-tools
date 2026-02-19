import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ToolStatus } from "@/lib/domain/types";
import { Badge } from "@/components/ui/Badge";

interface CardProps {
  title: string;
  description: string;
  badge: ToolStatus;
  icon: LucideIcon;
  href: string;
}

export function Card({ title, description, badge, icon: Icon, href }: CardProps) {
  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface/70 p-6 transition-all hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="rounded-lg bg-surface-strong p-2 text-text-muted transition-colors group-hover:bg-accent-soft group-hover:text-orange-300">
              <Icon size={20} />
            </div>
            <Badge variant={badge}>{badge}</Badge>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-text-muted">{description}</p>
        </div>

        <div className="flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-text-muted transition-colors group-hover:text-orange-300">
          Open Tool <ChevronRight size={14} className="ml-1" />
        </div>
      </Link>
    </article>
  );
}
