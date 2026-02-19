import {
  spreadForecastAreaSchema,
  toolDirectoryItemSchema,
  wildfireDetectionSchema
} from "@/lib/domain/schemas";

describe("domain schemas", () => {
  it("parses a valid wildfire detection", () => {
    const parsed = wildfireDetectionSchema.parse({
      id: "det-1",
      label: "Sample",
      coordinates: [-118.2, 34.2],
      intensity: 74,
      confidence: 88,
      acquiredAt: "2026-02-19T18:20:00.000Z"
    });

    expect(parsed.id).toBe("det-1");
  });

  it("rejects out-of-range coordinates", () => {
    const result = wildfireDetectionSchema.safeParse({
      id: "det-1",
      label: "Sample",
      coordinates: [-200, 34.2],
      intensity: 74,
      confidence: 88,
      acquiredAt: "2026-02-19T18:20:00.000Z"
    });

    expect(result.success).toBe(false);
  });

  it("requires at least 3 coordinates for forecast polygons", () => {
    const result = spreadForecastAreaSchema.safeParse({
      id: "forecast-1",
      probability: 64,
      coordinates: [
        [-118.2, 34.2],
        [-118.1, 34.3]
      ]
    });

    expect(result.success).toBe(false);
  });

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
});
