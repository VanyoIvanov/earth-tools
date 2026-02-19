import Link from "next/link";
import { Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer data-site-footer="true" className="border-t border-border bg-bg/95 py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row md:items-start">
        <div className="max-w-sm text-center md:text-left">
          <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
            <Globe size={18} className="text-accent" />
            <span className="text-sm font-bold text-white">Earth Tools</span>
          </div>
          <p className="text-xs leading-relaxed text-text-muted">
            A non-commercial project dedicated to open environmental data accessibility and transparency.
            Built for researchers, journalists, and citizens.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 text-xs font-bold uppercase tracking-[0.15em]">
          <div className="flex flex-col gap-3">
            <span className="text-text-muted">Resources</span>
            <Link href="/methods" className="text-text-muted hover:text-white">
              Methods
            </Link>
            <Link href="/methods" className="text-text-muted hover:text-white">
              API Docs
            </Link>
            <Link href="/status" className="text-text-muted hover:text-white">
              Dataset
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-text-muted">Platform</span>
            <Link href="/status" className="text-text-muted hover:text-white">
              Status
            </Link>
            <Link href="/methods" className="text-text-muted hover:text-white">
              Privacy
            </Link>
            <a href="https://github.com" className="text-text-muted hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl items-center justify-between border-t border-border px-6 pt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
        <span>© 2026 Earth Tools Foundation</span>
        <span>Open Source License (MIT)</span>
      </div>
    </footer>
  );
}
