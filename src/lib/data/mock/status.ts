import type { OverallState, PipelineRun, PipelineStatusItem } from "@/lib/domain/types";

export const overallStateData: OverallState = "normal";

export const systemSummaryData: PipelineStatusItem[] = [
  {
    label: "Data Ingestion (NASA)",
    status: "active",
    value: "412ms latency",
    lastRunLabel: "4m ago"
  },
  {
    label: "Forecast Engine",
    status: "active",
    value: "1.2M sims/hr",
    lastRunLabel: "12m ago"
  },
  {
    label: "API Gateway",
    status: "active",
    value: "99.99% uptime",
    lastRunLabel: "Live"
  },
  {
    label: "Tile Server",
    status: "active",
    value: "84ms avg response",
    lastRunLabel: "2s ago"
  }
];

export const pipelineRunsData: PipelineRun[] = [
  {
    id: "FC-8912",
    type: "Forecast Generation",
    status: "success",
    timeUtc: "12:04 UTC"
  },
  {
    id: "ID-4421",
    type: "NASA FIRMS Sync",
    status: "success",
    timeUtc: "11:45 UTC"
  },
  {
    id: "FC-8911",
    type: "Forecast Generation",
    status: "success",
    timeUtc: "11:04 UTC"
  },
  {
    id: "ID-4420",
    type: "NASA FIRMS Sync",
    status: "success",
    timeUtc: "10:45 UTC"
  },
  {
    id: "EX-9002",
    type: "Drought Mask Update",
    status: "success",
    timeUtc: "09:12 UTC"
  }
];
