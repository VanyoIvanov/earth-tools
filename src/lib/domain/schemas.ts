import { z } from "zod";

export const toolStatusSchema = z.enum([
  "live",
  "beta",
  "experimental",
  "default"
]);

export const toolIconNameSchema = z.enum([
  "flame",
  "wind",
  "clock",
  "zap",
  "droplets",
  "database"
]);

export const toolDirectoryItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  status: toolStatusSchema,
  icon: toolIconNameSchema,
  href: z.string().min(1)
});

export const systemStateSchema = z.enum(["active", "degraded", "offline"]);
export const overallStateSchema = z.enum(["normal", "degraded", "outage"]);
export const pipelineRunStatusSchema = z.enum(["success", "failed", "running"]);

export const pipelineStatusItemSchema = z.object({
  label: z.string().min(1),
  status: systemStateSchema,
  value: z.string().min(1),
  lastRunLabel: z.string().min(1)
});

export const pipelineRunSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  status: pipelineRunStatusSchema,
  timeUtc: z.string().min(1)
});

export const toolDirectorySchema = z.array(toolDirectoryItemSchema);
export const pipelineStatusSchema = z.array(pipelineStatusItemSchema);
export const pipelineRunsSchema = z.array(pipelineRunSchema);
