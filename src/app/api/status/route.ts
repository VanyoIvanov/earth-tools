import { NextResponse } from "next/server";
import { statusRepository } from "@/lib/data/repositories";

export async function GET() {
  const [systems, runs, overallState] = await Promise.all([
    statusRepository.getSystemSummary(),
    statusRepository.getLatestRuns(),
    statusRepository.getOverallState()
  ]);

  return NextResponse.json({ systems, runs, overallState });
}
