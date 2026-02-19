import type { Metadata } from "next";
import { Activity, BarChart3, ChevronRight, Database, Flame, X, Zap } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Methods & Transparency",
  description: "Learn how Earth Tools transforms satellite detections and weather models into wildfire probability layers.",
  openGraph: {
    title: "Earth Tools Methods",
    description:
      "Learn how Earth Tools transforms satellite detections and weather models into wildfire probability layers."
  }
};

export default function MethodsPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-4 text-3xl font-bold text-white">Methods &amp; Transparency</h1>
        <p className="mb-12 text-lg text-text-muted">
          Our open ecological intelligence pipeline: from raw satellite bytes to actionable probability layers.
        </p>

        <div className="space-y-12">
          <section className="rounded-2xl border border-border bg-surface/50 p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <Database className="text-accent" size={24} />
              01. Data Ingestion
            </h2>
            <p className="mb-6 leading-relaxed text-text-muted">
              We pull directly from NASA&apos;s FIRMS API and ingest VIIRS (S-NPP and NOAA-20) and MODIS (Terra and
              Aqua) data.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-bg p-4">
                <h3 className="mb-2 text-sm font-bold text-slate-200">Thermal Detections</h3>
                <p className="text-xs leading-relaxed text-text-muted">
                  375m spatial resolution for VIIRS, updated every 6-12 hours depending on satellite pass.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-bg p-4">
                <h3 className="mb-2 text-sm font-bold text-slate-200">Weather Models</h3>
                <p className="text-xs leading-relaxed text-text-muted">
                  GFS and ERA5 data for wind, humidity, and temperature.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface/50 p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <Zap className="text-accent" size={24} />
              02. Denoising &amp; Calibration
            </h2>
            <p className="mb-6 leading-relaxed text-text-muted">
              Raw thermal hotspots are prone to false positives from gas flares, volcanoes, and urban heat islands. We
              apply geospatial masking and temporal filtering.
            </p>
            <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-border bg-bg p-4 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-500/10 p-3 text-red-400">
                  <X size={20} />
                </div>
                <span className="font-mono text-xs text-text-muted">Raw Hotspots</span>
              </div>
              <ChevronRight className="rotate-90 text-border md:rotate-0" />
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-400">
                  <Activity size={20} />
                </div>
                <span className="font-mono text-xs text-text-muted">Temporal Filtering</span>
              </div>
              <ChevronRight className="rotate-90 text-border md:rotate-0" />
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500/10 p-3 text-orange-300">
                  <Flame size={20} />
                </div>
                <span className="font-mono text-xs text-text-muted">Active Fire Layer</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface/50 p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <BarChart3 className="text-accent" size={24} />
              03. Forecast Model (Probabilistic)
            </h2>
            <p className="mb-4 leading-relaxed text-text-muted">
              Our spread model uses a modified Huygens principle. We run 1,000 simulations per fire detection,
              varying wind direction and speed within forecast uncertainty bounds.
            </p>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-border" />
                <span>
                  <strong className="text-slate-200">Fuel Load:</strong> Integrated from ESA WorldCover and
                  CGLS-LC100.
                </span>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-border" />
                <span>
                  <strong className="text-slate-200">Topography:</strong> SRTM digital elevation model to calculate
                  slope-aided spread.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
