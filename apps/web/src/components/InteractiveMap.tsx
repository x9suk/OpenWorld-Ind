'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { getStateColor, INDIA_CENTER, INDIA_DEFAULT_ZOOM } from '@openworld/shared';
import { getRegionForState } from '@/data/regions';
import { INDIA_STATES_GEOJSON } from '@/data/indiaGeoJSON';
import { MonumentPopupCard } from './MonumentPopupCard';
import type { State, Monument, City } from '@openworld/types';
import type { Region } from '@/data/regions';

const monumentIcon = L.divIcon({
  className: 'monument-marker',
  html: '<div style="background:#f97316;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);transition:transform 0.2s">🕌</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const cityIcon = L.divIcon({
  className: 'city-marker',
  html: '<div style="background:#3b82f6;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);transition:transform 0.2s">🏙</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const selectedMonumentIcon = L.divIcon({
  className: 'monument-marker-selected',
  html: '<div style="background:#ea580c;color:white;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid #fef3c7;box-shadow:0 4px 12px rgba(0,0,0,0.5)">🕌</div>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export interface MapViewData {
  states: State[];
  monuments: Monument[];
  cities: City[];
}

export type MapMarkerType = 'states' | 'monuments' | 'cities';

interface InteractiveMapProps {
  data: MapViewData;
  selectedStateId: string | null;
  onSelectState: (state: State | null) => void;
  activeMarkerTypes: MapMarkerType[];
  regionFilter: Region | null;
  searchQuery: string;
}

function FlyToState({ state }: { state: State | null }) {
  const map = useMap();
  useEffect(() => {
    if (state) {
      map.flyTo([state.coordinates.lat, state.coordinates.lng], 7, { duration: 0.8 });
    }
  }, [map, state]);
  return null;
}

const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const lightTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function InteractiveMap({
  data, selectedStateId, onSelectState, activeMarkerTypes, regionFilter, searchQuery,
}: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [selectedMonumentId, setSelectedMonumentId] = useState<string | null>(null);

  const selectedState = useMemo(
    () => selectedStateId ? data.states.find((s) => s.id === selectedStateId) || null : null,
    [selectedStateId, data.states],
  );

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const stateMap = useMemo(() => {
    const map: Record<string, State> = {};
    for (const s of data.states) {
      map[s.name] = s;
    }
    return map;
  }, [data.states]);

  const filteredStatesSet = useMemo(() => {
    const set = new Set<string>();
    for (const s of data.states) {
      if (regionFilter && getRegionForState(s.name) !== regionFilter) continue;
      if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) continue;
      set.add(s.name);
    }
    return set;
  }, [data.states, regionFilter, searchQuery]);

  const geoJsonKey = useMemo(
    () => `${regionFilter ?? 'all'}-${searchQuery}-${selectedStateId ?? 'none'}-${hoveredStateId ?? 'none'}`,
    [regionFilter, searchQuery, selectedStateId, hoveredStateId],
  );

  const onEachFeature = useCallback(
    (feature: any, layer: L.Layer) => {
      const name: string = feature.properties.name;
      const path = layer as L.Polygon;

      const stateObj = stateMap[name];
      const isFiltered = filteredStatesSet.has(name);

      const getFillOpacity = () => {
        if (!isFiltered) return 0.1;
        if (selectedStateId && stateObj?.id === selectedStateId) return 0.85;
        if (hoveredStateId === name) return 0.75;
        return 0.4;
      };

      path.setStyle({
        color: isFiltered ? '#475569' : '#334155',
        weight: selectedStateId && stateObj?.id === selectedStateId ? 3 : hoveredStateId === name ? 2.5 : 1.5,
        fillColor: isFiltered ? getStateColor(name) : '#475569',
        fillOpacity: getFillOpacity(),
        dashArray: isFiltered ? undefined : '4 4',
      });

      path.on({
        mouseover: () => {
          if (isFiltered) {
            setHoveredStateId(name);
            path.setStyle({
              fillOpacity: 0.75,
              weight: 2.5,
            });
            if (path.getElement()) {
              (path.getElement() as SVGElement).style.cursor = 'pointer';
            }
          }
        },
        mouseout: () => {
          setHoveredStateId(null);
          path.setStyle({
            fillOpacity: selectedStateId && stateObj?.id === selectedStateId ? 0.85 : 0.4,
            weight: selectedStateId && stateObj?.id === selectedStateId ? 3 : 1.5,
          });
        },
        click: () => {
          if (isFiltered && stateObj) {
            onSelectState(selectedStateId === stateObj.id ? null : stateObj);
          }
        },
      });

      const label = name;
      const center = path.getBounds().getCenter();
      const tooltip = L.tooltip({
        direction: 'center',
        permanent: false,
        sticky: true,
        offset: L.point(0, 0),
        className: 'state-tooltip',
      });
      tooltip.setContent(`<div class="text-sm font-bold">${label}</div>`);
      path.bindTooltip(tooltip);
    },
    [stateMap, filteredStatesSet, selectedStateId, hoveredStateId, onSelectState],
  );

  const geoJsonFilter = useCallback(
    (feature: any) => {
      if (!regionFilter && !searchQuery) return true;
      const name: string = feature.properties.name;
      return filteredStatesSet.has(name);
    },
    [regionFilter, searchQuery, filteredStatesSet],
  );

  const filteredMonuments = useMemo(() => data.monuments.filter((m) => {
    if (regionFilter) {
      const parentState = data.states.find((s) => s.id === m.stateId);
      if (parentState && getRegionForState(parentState.name) !== regionFilter) return false;
    }
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }), [data.monuments, data.states, regionFilter, searchQuery]);

  const filteredCities = useMemo(() => data.cities.filter((c) => {
    if (regionFilter) {
      const parentState = data.states.find((s) => s.id === c.stateId);
      if (parentState && getRegionForState(parentState.name) !== regionFilter) return false;
    }
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }), [data.cities, data.states, regionFilter, searchQuery]);

  const handleMonumentClick = useCallback((monumentId: string) => {
    setSelectedMonumentId((prev) => (prev === monumentId ? null : monumentId));
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />;
  }

  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={INDIA_DEFAULT_ZOOM}
      className="w-full h-full min-h-[500px] rounded-xl z-0"
      zoomControl={true}
    >
      <LayersControl position="bottomright">
        <LayersControl.BaseLayer checked={!isDark} name="Light">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={lightTileUrl}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked={isDark} name="Dark">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url={darkTileUrl}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <FlyToState state={selectedState} />

      {activeMarkerTypes.includes('states') && (
        <GeoJSON
          key={geoJsonKey}
          ref={geoJsonRef}
          data={INDIA_STATES_GEOJSON}
          onEachFeature={onEachFeature}
          filter={geoJsonFilter}
        />
      )}

      {activeMarkerTypes.includes('monuments') && filteredMonuments.length > 0 && (
        <MarkerClusterGroup chunkedLoading>
          {filteredMonuments.map((m) => (
            <Marker
              key={m.id}
              position={[m.coordinates.lat, m.coordinates.lng]}
              icon={selectedMonumentId === m.id ? selectedMonumentIcon : monumentIcon}
              eventHandlers={{
                click: () => handleMonumentClick(m.id),
              }}
            >
              <Popup maxWidth={320} minWidth={260} className="monument-popup">
                <MonumentPopupCard monument={m} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      )}

      {activeMarkerTypes.includes('cities') && filteredCities.length > 0 && (
        <MarkerClusterGroup chunkedLoading>
          {filteredCities.map((c) => (
            <Marker
              key={c.id}
              position={[c.coordinates.lat, c.coordinates.lng]}
              icon={cityIcon}
            >
              <Popup>
                <div className="min-w-[160px]">
                  <div className="font-bold text-sm text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Population: {c.population.toLocaleString('en-IN')}
                  </div>
                  {c.description && (
                    <div className="text-xs text-slate-600 mt-1 line-clamp-2">{c.description}</div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  );
}
