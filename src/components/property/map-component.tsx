"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// You should add your Mapbox token to .env.local as NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
  }>;
}

export function MapComponent({ 
  center = [-118.4007, 34.0736], // Default to Beverly Hills
  zoom = 12,
  markers = [] 
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: center,
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers
    markers.forEach((marker) => {
      new mapboxgl.Marker({ color: "#10B981" })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${marker.title}</h3>`))
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom, markers]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border">
      <div ref={mapContainer} className="h-full w-full" />
      
      {/* Custom UI Over Map */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="rounded-xl bg-white/80 p-3 text-xs font-bold backdrop-blur-md dark:bg-black/80">
          Interactive Map View
        </div>
      </div>
    </div>
  );
}
