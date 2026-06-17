'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { stateSlugs, INDIA_CENTER, INDIA_DEFAULT_ZOOM } from '@openworld/shared';
import { api } from '@/lib/api';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface StateLocation {
  name: string;
  capital: string;
  slug: string;
  coordinates: [number, number];
}

function FitBoundsOnLoad({ states }: { states: StateLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (states.length > 0) {
      const bounds = L.latLngBounds(states.map((s) => s.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, states]);
  return null;
}

export default function IndiaMap() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [states, setStates] = useState<StateLocation[]>([]);

  const fetchStates = useCallback(async () => {
    try {
      const res = await api.states.list();
      const data = res.data || [];
      setStates(
        data.map((s: any) => ({
          name: s.name,
          capital: s.capital,
          slug: stateSlugs[s.name] || s.name.toLowerCase().replace(/\s+/g, '-'),
          coordinates: s.coordinates
            ? [s.coordinates.lat, s.coordinates.lng] as [number, number]
            : [20.5937, 78.9629],
        })),
      );
    } catch {
      //
    }
  }, []);

  useEffect(() => { fetchStates(); }, [fetchStates]);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-[400px] md:h-[600px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />;

  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={INDIA_DEFAULT_ZOOM}
      className="min-h-[400px] md:h-[600px] w-full rounded-xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBoundsOnLoad states={states} />
      {states.map((state) => (
        <Marker
          key={state.slug}
          position={state.coordinates}
          icon={defaultIcon}
          eventHandlers={{
            click: () => router.push(`/states/${state.slug}`),
          }}
        >
          <Tooltip direction="top" offset={[0, -40]} permanent={false}>
            <span className="text-sm font-medium">{state.name}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
