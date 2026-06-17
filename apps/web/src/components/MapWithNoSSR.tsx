'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { INDIA_CENTER, INDIA_DEFAULT_ZOOM } from '@openworld/shared';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface MapMarker {
  position: [number, number];
  title: string;
  onClick?: () => void;
}

interface MapWithNoSSRProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
}

export default function MapWithNoSSR({
  center = INDIA_CENTER,
  zoom = INDIA_DEFAULT_ZOOM,
  markers = [],
}: MapWithNoSSRProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full h-full min-h-[300px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />;

  return (
    <div className="w-full h-full min-h-[300px] rounded-xl">
      <MapContainer center={center} zoom={zoom} className="w-full h-full min-h-[300px] rounded-xl z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            icon={defaultIcon}
            eventHandlers={marker.onClick ? { click: marker.onClick } : undefined}
          >
            <Tooltip direction="top" offset={[0, -40]}>
              <span className="text-sm font-medium">{marker.title}</span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
