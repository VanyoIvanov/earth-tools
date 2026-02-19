"use client";

import dynamic from "next/dynamic";
import type { WildfireMapProps } from "@/components/wildfire/WildfireMap.client";

const WildfireMap = dynamic(() => import("@/components/wildfire/WildfireMap.client"), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-[66dvh] flex-1 overflow-hidden bg-[linear-gradient(135deg,#0b1222_0%,#101a2d_100%)]" />
  )
});

export function WildfireMapShell(props: WildfireMapProps) {
  return <WildfireMap {...props} />;
}
