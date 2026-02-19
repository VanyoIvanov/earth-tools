import type { Metadata } from "next";
import { WildfireSidebar } from "@/components/wildfire/WildfireSidebar";
import { WildfireMapShell } from "@/components/wildfire/WildfireMapShell.client";
import { wildfireRepository } from "@/lib/data/repositories";

export const metadata: Metadata = {
  title: "Wildfire Nowcast & Forecast",
  description: "Near real-time fire perimeter estimation and short-term spread forecasting.",
  openGraph: {
    title: "Earth Tools Wildfire",
    description: "Near real-time fire perimeter estimation and short-term spread forecasting."
  }
};

export default async function WildfirePage() {
  const [sidebarMeta, detections, forecasts, boundaries, updatedAt] = await Promise.all([
    wildfireRepository.getSidebarMeta(),
    wildfireRepository.getActiveDetections(),
    wildfireRepository.getForecastAreas(),
    wildfireRepository.getBoundaryLines(),
    wildfireRepository.getUpdatedAt()
  ]);

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:flex-row">
      <WildfireSidebar meta={sidebarMeta} />
      <WildfireMapShell
        detections={detections}
        forecasts={forecasts}
        boundaries={boundaries}
        updatedAt={updatedAt}
      />
    </div>
  );
}
