'use client';

import clsx from 'clsx';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: Marker[];
  className?: string;
}

export function MapView({ className }: MapViewProps) {
  return (
    <div
      id="map-container"
      className={clsx('w-full h-full rounded-xl', className)}
    />
  );
}
