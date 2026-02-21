import { siteRepository, statusRepository } from "@/lib/data/repositories";

describe("repositories", () => {
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
