import { siteRepository, statusRepository, wildfireRepository } from "@/lib/data/repositories";

describe("repositories", () => {
  it("returns validated wildfire datasets", async () => {
    const detections = await wildfireRepository.getActiveDetections();
    const forecasts = await wildfireRepository.getForecastAreas();
    const sidebar = await wildfireRepository.getSidebarMeta();

    expect(detections.length).toBeGreaterThan(0);
    expect(forecasts.length).toBeGreaterThan(0);
    expect(sidebar.steps.length).toBeGreaterThan(0);
  });

  it("returns validated status datasets", async () => {
    const systems = await statusRepository.getSystemSummary();
    const runs = await statusRepository.getLatestRuns();
    const overallState = await statusRepository.getOverallState();

    expect(systems.every((item) => item.label.length > 0)).toBe(true);
    expect(runs.every((item) => item.id.length > 0)).toBe(true);
    expect(["normal", "degraded", "outage"]).toContain(overallState);
  });

  it("returns tool directory and featured tool", async () => {
    const tools = await siteRepository.getToolDirectory();
    const featured = await siteRepository.getFeaturedTool();

    expect(tools.length).toBeGreaterThan(0);
    expect(featured.id).toBe(tools[0]?.id);
  });
});
