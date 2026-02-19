import {
  boundaryLinesSchema,
  overallStateSchema,
  pipelineRunsSchema,
  pipelineStatusSchema,
  spreadForecastAreasSchema,
  toolDirectorySchema,
  wildfireDetectionsSchema,
  wildfireSidebarMetaSchema
} from "@/lib/domain/schemas";
import type {
  BoundaryLine,
  OverallState,
  PipelineRun,
  PipelineStatusItem,
  SpreadForecastArea,
  ToolDirectoryItem,
  WildfireDetection,
  WildfireSidebarMeta
} from "@/lib/domain/types";
import { pipelineRunsData, systemSummaryData, overallStateData } from "@/lib/data/mock/status";
import { toolDirectoryData } from "@/lib/data/mock/tools";
import {
  boundaryLinesData,
  spreadForecastAreasData,
  wildfireDetectionsData,
  wildfireSidebarMetaData
} from "@/lib/data/mock/wildfire";

export interface WildfireRepository {
  getActiveDetections(): Promise<WildfireDetection[]>;
  getForecastAreas(): Promise<SpreadForecastArea[]>;
  getBoundaryLines(): Promise<BoundaryLine[]>;
  getSidebarMeta(): Promise<WildfireSidebarMeta>;
  getUpdatedAt(): Promise<string>;
}

export interface StatusRepository {
  getSystemSummary(): Promise<PipelineStatusItem[]>;
  getLatestRuns(): Promise<PipelineRun[]>;
  getOverallState(): Promise<OverallState>;
}

export interface SiteRepository {
  getToolDirectory(): Promise<ToolDirectoryItem[]>;
  getFeaturedTool(): Promise<ToolDirectoryItem>;
}

const updatedAt = "2026-02-19T20:24:00.000Z";

export const wildfireRepository: WildfireRepository = {
  async getActiveDetections() {
    return wildfireDetectionsSchema.parse(wildfireDetectionsData);
  },
  async getForecastAreas() {
    return spreadForecastAreasSchema.parse(spreadForecastAreasData);
  },
  async getBoundaryLines() {
    return boundaryLinesSchema.parse(boundaryLinesData);
  },
  async getSidebarMeta() {
    return wildfireSidebarMetaSchema.parse(wildfireSidebarMetaData);
  },
  async getUpdatedAt() {
    return updatedAt;
  }
};

export const statusRepository: StatusRepository = {
  async getSystemSummary() {
    return pipelineStatusSchema.parse(systemSummaryData);
  },
  async getLatestRuns() {
    return pipelineRunsSchema.parse(pipelineRunsData);
  },
  async getOverallState() {
    return overallStateSchema.parse(overallStateData);
  }
};

export const siteRepository: SiteRepository = {
  async getToolDirectory() {
    return toolDirectorySchema.parse(toolDirectoryData);
  },
  async getFeaturedTool() {
    const tools = toolDirectorySchema.parse(toolDirectoryData);
    const first = tools[0];
    if (!first) {
      throw new Error("No tools available for feature selection.");
    }
    return first;
  }
};
