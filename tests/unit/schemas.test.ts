import { pipelineStatusItemSchema, toolDirectoryItemSchema } from "@/lib/domain/schemas";

describe("domain schemas", () => {
  it("parses directory tool items", () => {
    const result = toolDirectoryItemSchema.safeParse({
      id: "tool-1",
      title: "Wildfire Nowcast",
      description: "Realtime detections",
      status: "live",
      icon: "flame",
      href: "/wildfire"
    });

    expect(result.success).toBe(true);
  });

  it("requires valid pipeline status values", () => {
    const result = pipelineStatusItemSchema.safeParse({
      label: "Ingest Pipeline",
      status: "unknown",
      value: "ok",
      lastRunLabel: "2m ago"
    });

    expect(result.success).toBe(false);
  });
});
