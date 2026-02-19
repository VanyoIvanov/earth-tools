import { AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { WildfireSidebarMeta } from "@/lib/domain/types";

interface WildfireSidebarProps {
  meta: WildfireSidebarMeta;
}

function SidebarSections({ meta }: WildfireSidebarProps) {
  return (
    <>
      <section>
        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">How It Works</h3>
        <div className="space-y-4">
          {meta.steps.map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="font-mono text-xs text-accent">{item.step}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <p className="text-[11px] text-text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Data Sources</h3>
        <ul className="space-y-2">
          {meta.dataSources.map((source) => (
            <li key={source} className="flex items-center justify-between text-[11px] text-slate-300">
              <span>{source}</span>
              <ExternalLink size={10} className="text-text-muted" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-border bg-surface p-4">
        <h3 className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
          <AlertCircle size={10} /> Limitations
        </h3>
        <p className="text-[11px] leading-relaxed text-text-muted">{meta.limitations}</p>
      </section>
    </>
  );
}

export function WildfireSidebar({ meta }: WildfireSidebarProps) {
  return (
    <>
      <aside className="hidden h-[calc(100dvh-4rem)] border-r border-border bg-bg lg:flex lg:w-80 lg:flex-col">
        <div className="border-b border-border p-6">
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">{meta.title}</h2>
            <Badge variant="live">Live</Badge>
          </div>
          <p className="text-xs leading-relaxed text-text-muted">{meta.summary}</p>
        </div>

        <div
          className="flex-1 space-y-8 overflow-y-auto p-6"
          tabIndex={0}
          aria-label="Wildfire model documentation"
        >
          <SidebarSections meta={meta} />
        </div>

        <div className="border-t border-border bg-surface/30 p-4">
          <div className="flex items-center justify-between text-[10px] text-text-muted">
            <span>{meta.modelVersion}</span>
            <span>{meta.updatedLabel}</span>
          </div>
        </div>
      </aside>

      <details className="border-b border-border bg-surface/60 lg:hidden" open>
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-white">Wildfire model details</summary>
        <div className="space-y-8 border-t border-border p-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{meta.title}</h2>
              <Badge variant="live">Live</Badge>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">{meta.summary}</p>
          </div>
          <SidebarSections meta={meta} />
        </div>
      </details>
    </>
  );
}
