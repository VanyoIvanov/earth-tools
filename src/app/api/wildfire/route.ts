import { NextResponse } from "next/server";
import { wildfireRepository } from "@/lib/data/repositories";

export async function GET() {
  const [detections, forecasts, updatedAt] = await Promise.all([
    wildfireRepository.getActiveDetections(),
    wildfireRepository.getForecastAreas(),
    wildfireRepository.getUpdatedAt()
  ]);

  return NextResponse.json({ detections, forecasts, updatedAt });
}
