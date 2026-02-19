import type {
  BoundaryLine,
  SpreadForecastArea,
  WildfireDetection,
  WildfireSidebarMeta
} from "@/lib/domain/types";

export const wildfireDetectionsData: WildfireDetection[] = [
  {
    id: "det-001",
    label: "Angeles National Forest",
    coordinates: [-118.2437, 34.0522],
    intensity: 84,
    confidence: 91,
    acquiredAt: "2026-02-19T20:12:00.000Z"
  },
  {
    id: "det-002",
    label: "Santa Clarita Ridge",
    coordinates: [-118.5504, 34.3917],
    intensity: 62,
    confidence: 86,
    acquiredAt: "2026-02-19T19:44:00.000Z"
  },
  {
    id: "det-003",
    label: "San Bernardino Front",
    coordinates: [-117.2898, 34.1083],
    intensity: 48,
    confidence: 79,
    acquiredAt: "2026-02-19T18:20:00.000Z"
  }
];

export const spreadForecastAreasData: SpreadForecastArea[] = [
  {
    id: "forecast-24h-001",
    probability: 84,
    coordinates: [
      [-118.44, 34.27],
      [-118.2, 34.38],
      [-117.98, 34.24],
      [-118.05, 33.98],
      [-118.31, 33.96]
    ]
  }
];

export const boundaryLinesData: BoundaryLine[] = [
  {
    id: "boundary-001",
    label: "Regional boundary",
    coordinates: [
      [-118.82, 34.6],
      [-118.56, 34.45],
      [-118.2, 34.56],
      [-117.82, 34.4],
      [-117.65, 34.1]
    ]
  },
  {
    id: "boundary-002",
    label: "County line",
    coordinates: [
      [-118.72, 33.95],
      [-118.46, 34.04],
      [-118.2, 33.94],
      [-117.92, 34.02],
      [-117.75, 33.88]
    ]
  }
];

export const wildfireSidebarMetaData: WildfireSidebarMeta = {
  title: "Wildfire Nowcast",
  summary: "Near real-time fire perimeter estimation and short-term forecasting.",
  steps: [
    {
      step: "01",
      title: "Detection",
      description: "NASA VIIRS/MODIS hotspots updated every 3-6 hours."
    },
    {
      step: "02",
      title: "Context",
      description: "Live wind vectors and fuel moisture cross-referenced."
    },
    {
      step: "03",
      title: "Forecast",
      description: "Monte Carlo simulation for spread probability."
    }
  ],
  dataSources: ["NASA FIRMS (VIIRS)", "NOAA GFS (Weather)", "ESA WorldCover (Fuel)"],
  limitations:
    "Detections can be obscured by heavy cloud cover. Forecasts do not account for active suppression efforts.",
  modelVersion: "v2.4.0-beta",
  updatedLabel: "Updated 12m ago"
};
