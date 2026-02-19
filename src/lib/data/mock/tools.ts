import type { ToolDirectoryItem } from "@/lib/domain/types";

export const toolDirectoryData: ToolDirectoryItem[] = [
  {
    id: "wildfire-nowcast",
    title: "Wildfire Nowcast",
    description: "Real-time satellite detections cleaned of noise and false positives.",
    status: "live",
    icon: "flame",
    href: "/wildfire"
  },
  {
    id: "fire-spread-forecast",
    title: "Fire Spread Forecast",
    description: "Probabilistic modeling of fire movement based on fuel, wind, and slope.",
    status: "beta",
    icon: "wind",
    href: "/wildfire"
  },
  {
    id: "historical-fire-explorer",
    title: "Historical Fire Explorer",
    description: "Analyze decades of fire data to understand changing regional patterns.",
    status: "live",
    icon: "clock",
    href: "/methods"
  },
  {
    id: "heatwave-monitor",
    title: "Heatwave Monitor",
    description: "Global temperature anomaly tracking for urban and rural heat stress.",
    status: "experimental",
    icon: "zap",
    href: "/methods"
  },
  {
    id: "drought-conditions",
    title: "Drought Conditions",
    description: "Satellite-derived soil moisture and vegetation health indices.",
    status: "experimental",
    icon: "droplets",
    href: "/methods"
  },
  {
    id: "aoi-report-generator",
    title: "AOI Report Generator",
    description: "Generate PDF ecological impact reports for specific Areas of Interest.",
    status: "beta",
    icon: "database",
    href: "/status"
  }
];
