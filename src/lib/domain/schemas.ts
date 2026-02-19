import { z } from "zod";

const coordinateSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90)
]);

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

export const wildfireDetectionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  coordinates: coordinateSchema,
  intensity: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  acquiredAt: z.string().datetime()
});

export const spreadForecastAreaSchema = z.object({
  id: z.string().min(1),
  probability: z.number().min(0).max(100),
  coordinates: z.array(coordinateSchema).min(3)
});

export const boundaryLineSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  coordinates: z.array(coordinateSchema).min(2)
});

export const wildfireStepSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1)
});

export const wildfireSidebarMetaSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  steps: z.array(wildfireStepSchema).min(1),
  dataSources: z.array(z.string().min(1)).min(1),
  limitations: z.string().min(1),
  modelVersion: z.string().min(1),
  updatedLabel: z.string().min(1)
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
export const wildfireDetectionsSchema = z.array(wildfireDetectionSchema);
export const spreadForecastAreasSchema = z.array(spreadForecastAreaSchema);
export const boundaryLinesSchema = z.array(boundaryLineSchema);
export const pipelineStatusSchema = z.array(pipelineStatusItemSchema);
export const pipelineRunsSchema = z.array(pipelineRunSchema);
