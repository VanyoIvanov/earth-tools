import {
  overallStateSchema,
  pipelineRunsSchema,
  pipelineStatusSchema,
  toolDirectorySchema
} from "@/lib/domain/schemas";
import type {
  OverallState,
  PipelineRun,
  PipelineStatusItem,
  ToolDirectoryItem
} from "@/lib/domain/types";
import { pipelineRunsData, systemSummaryData, overallStateData } from "@/lib/data/mock/status";
import { toolDirectoryData } from "@/lib/data/mock/tools";

export interface StatusRepository {
  getSystemSummary(): Promise<PipelineStatusItem[]>;
  getLatestRuns(): Promise<PipelineRun[]>;
  getOverallState(): Promise<OverallState>;
}

export interface SiteRepository {
  getToolDirectory(): Promise<ToolDirectoryItem[]>;
  getFeaturedTool(): Promise<ToolDirectoryItem>;
}

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
