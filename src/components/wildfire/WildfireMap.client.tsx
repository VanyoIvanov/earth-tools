"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FeatureCollection, LineString, Point, Polygon } from "geojson";
import maplibregl, { type Map as MapInstance } from "maplibre-gl";
import { Database, Layers, Map as MapIcon, Plus, Minus } from "lucide-react";
import type { BoundaryLine, SpreadForecastArea, WildfireDetection } from "@/lib/domain/types";

export interface WildfireMapProps {
  detections: WildfireDetection[];
  forecasts: SpreadForecastArea[];
  boundaries: BoundaryLine[];
  updatedAt: string;
}

const SOURCE_IDS = {
  detections: "detections-source",
  forecasts: "forecasts-source",
  boundaries: "boundaries-source"
} as const;

const LAYER_IDS = {
  detectionsGlow: "detections-glow-layer",
  detectionsCore: "detections-core-layer",
  forecastsFill: "forecasts-fill-layer",
  forecastsLine: "forecasts-line-layer",
  boundaries: "boundaries-layer"
} as const;

const initialView = {
  center: [-118.2437, 34.0522] as [number, number],
  zoom: 7
};

function closeRing(coordinates: [number, number][]): [number, number][] {
  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];

  if (!first || !last) {
    return coordinates;
  }

  if (first[0] === last[0] && first[1] === last[1]) {
    return coordinates;
  }

  return [...coordinates, first];
}

export default function WildfireMap({ detections, forecasts, boundaries, updatedAt }: WildfireMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  const detectionsGeoJson = useMemo<FeatureCollection<Point, { id: string; intensity: number }>>(
    () => ({
      type: "FeatureCollection",
      features: detections.map((detection) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: detection.coordinates
        },
        properties: {
          id: detection.id,
          intensity: detection.intensity
        }
      }))
    }),
    [detections]
  );

  const forecastsGeoJson = useMemo<FeatureCollection<Polygon, { id: string; probability: number }>>(
    () => ({
      type: "FeatureCollection",
      features: forecasts.map((forecast) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [closeRing(forecast.coordinates)]
        },
        properties: {
          id: forecast.id,
          probability: forecast.probability
        }
      }))
    }),
    [forecasts]
  );

  const boundariesGeoJson = useMemo<FeatureCollection<LineString, { id: string; label: string }>>(
    () => ({
      type: "FeatureCollection",
      features: boundaries.map((boundary) => ({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: boundary.coordinates
        },
        properties: {
          id: boundary.id,
          label: boundary.label
        }
      }))
    }),
    [boundaries]
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || mapError) {
      return;
    }

    let map: MapInstance;
    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: initialView.center,
        zoom: initialView.zoom,
        attributionControl: false
      });
    } catch {
      queueMicrotask(() => {
        setMapError("Map rendering could not be initialized in this environment.");
      });
      return;
    }

    mapRef.current = map;

    map.on("error", (event) => {
      if (event.error) {
        setMapError("Map failed to load. Please refresh and try again.");
      }
    });

    map.on("load", () => {
      setMapReady(true);

      map.addSource(SOURCE_IDS.detections, {
        type: "geojson",
        data: detectionsGeoJson
      });

      map.addLayer({
        id: LAYER_IDS.detectionsGlow,
        type: "circle",
        source: SOURCE_IDS.detections,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 20, 14, 95, 32],
          "circle-color": "#f97316",
          "circle-opacity": 0.24,
          "circle-blur": 0.8
        }
      });

      map.addLayer({
        id: LAYER_IDS.detectionsCore,
        type: "circle",
        source: SOURCE_IDS.detections,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 20, 4, 95, 8],
          "circle-color": "#fb923c",
          "circle-opacity": 0.95,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fdba74"
        }
      });

      map.addSource(SOURCE_IDS.forecasts, {
        type: "geojson",
        data: forecastsGeoJson
      });

      map.addLayer({
        id: LAYER_IDS.forecastsFill,
        type: "fill",
        source: SOURCE_IDS.forecasts,
        paint: {
          "fill-color": "#f97316",
          "fill-opacity": 0.2
        }
      });

      map.addLayer({
        id: LAYER_IDS.forecastsLine,
        type: "line",
        source: SOURCE_IDS.forecasts,
        paint: {
          "line-color": "#fdba74",
          "line-width": 2,
          "line-dasharray": [2, 2]
        }
      });

      map.addSource(SOURCE_IDS.boundaries, {
        type: "geojson",
        data: boundariesGeoJson
      });

      map.addLayer({
        id: LAYER_IDS.boundaries,
        type: "line",
        source: SOURCE_IDS.boundaries,
        paint: {
          "line-color": "#334155",
          "line-width": 1.2
        }
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [boundariesGeoJson, detectionsGeoJson, forecastsGeoJson, mapError]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) {
      return;
    }

    const detectionsSource = map.getSource(SOURCE_IDS.detections) as maplibregl.GeoJSONSource | undefined;
    const forecastsSource = map.getSource(SOURCE_IDS.forecasts) as maplibregl.GeoJSONSource | undefined;
    const boundariesSource = map.getSource(SOURCE_IDS.boundaries) as maplibregl.GeoJSONSource | undefined;

    detectionsSource?.setData(detectionsGeoJson as FeatureCollection<Point>);
    forecastsSource?.setData(forecastsGeoJson as FeatureCollection<Polygon>);
    boundariesSource?.setData(boundariesGeoJson as FeatureCollection<LineString>);
  }, [boundariesGeoJson, detectionsGeoJson, forecastsGeoJson, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) {
      return;
    }

    if (map.getLayer(LAYER_IDS.boundaries)) {
      map.setLayoutProperty(LAYER_IDS.boundaries, "visibility", showBoundaries ? "visible" : "none");
    }
  }, [mapReady, showBoundaries]);

  const peakIntensity = Math.max(...detections.map((item) => item.intensity), 0);

  return (
    <section className="relative min-h-[66dvh] flex-1 overflow-hidden bg-bg" aria-label="Wildfire map area">
      <div ref={mapContainerRef} data-testid="wildfire-map" className="absolute inset-0" />

      {!mapReady ? (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(135deg,#0b1222_0%,#101a2d_100%)]" aria-hidden="true" />
      ) : null}

      {mapError ? (
        <div className="absolute inset-x-6 top-6 rounded-lg border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          {mapError}
        </div>
      ) : null}

      <div className="absolute left-6 top-6 flex flex-col gap-2">
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-bg/90 p-1.5 shadow-2xl backdrop-blur">
          <button
            type="button"
            className="rounded p-2 text-text-muted transition-colors hover:bg-surface hover:text-white"
            onClick={() => mapRef.current?.zoomIn()}
            aria-label="Zoom in"
          >
            <Plus size={18} />
          </button>
          <button
            type="button"
            className="rounded p-2 text-text-muted transition-colors hover:bg-surface hover:text-white"
            onClick={() => mapRef.current?.zoomOut()}
            aria-label="Zoom out"
          >
            <Minus size={18} />
          </button>
          <div className="mx-2 my-1 h-px bg-border" />
          <button
            type="button"
            className="rounded p-2 text-text-muted transition-colors hover:bg-surface hover:text-white"
            onClick={() => mapRef.current?.flyTo({ center: initialView.center, zoom: initialView.zoom })}
            aria-label="Recenter map"
          >
            <MapIcon size={18} />
          </button>
          <button
            type="button"
            className="rounded p-2 text-text-muted transition-colors hover:bg-surface hover:text-white"
            onClick={() => setShowBoundaries((current) => !current)}
            aria-label={showBoundaries ? "Hide boundary lines" : "Show boundary lines"}
          >
            <Layers size={18} />
          </button>
          <button
            type="button"
            className="rounded p-2 text-text-muted transition-colors hover:bg-surface hover:text-white"
            onClick={() => mapRef.current?.resize()}
            aria-label="Refresh map view"
          >
            <Database size={18} />
          </button>
        </div>
      </div>

      <aside
        data-testid="map-legend"
        className="absolute bottom-6 right-6 w-64 rounded-xl border border-border bg-bg/95 p-4 shadow-2xl backdrop-blur"
      >
        <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Map Legend</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <span className="text-xs text-slate-200">Active Thermal Detection</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-sm border border-orange-300/40 bg-orange-500/20" />
            <span className="text-xs text-slate-200">24h Spread Probability</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-3 bg-slate-600" />
            <span className="text-xs text-slate-200">Regional Boundaries</span>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="mb-2 flex items-center justify-between text-[10px] text-text-muted">
            <span>View: Fire Intensity</span>
            <span className="text-accent">{peakIntensity}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-strong">
            <div className="h-full bg-accent" style={{ width: `${peakIntensity}%` }} />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            Updated {new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} UTC
          </p>
        </div>
      </aside>
    </section>
  );
}
