export type ToolStatus = "live" | "beta" | "experimental" | "default";

export type ToolIconName =
  | "flame"
  | "wind"
  | "clock"
  | "zap"
  | "droplets"
  | "database";

export interface ToolDirectoryItem {
  id: string;
  title: string;
  description: string;
  status: ToolStatus;
  icon: ToolIconName;
  href: string;
}

export type SystemState = "active" | "degraded" | "offline";
export type OverallState = "normal" | "degraded" | "outage";
export type PipelineRunStatus = "success" | "failed" | "running";

export interface PipelineStatusItem {
  label: string;
  status: SystemState;
  value: string;
  lastRunLabel: string;
}

export interface PipelineRun {
  id: string;
  type: string;
  status: PipelineRunStatus;
  timeUtc: string;
}
