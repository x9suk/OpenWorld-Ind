'use client';

import { useMemo } from 'react';
import type { State, Monument, City } from '@openworld/types';
import { motion } from 'framer-motion';

interface FloatingStatsOverlayProps {
  states: State[];
  monuments: Monument[];
  cities: City[];
  visible: boolean;
}

export function FloatingStatsOverlay({ states, monuments, cities, visible }: FloatingStatsOverlayProps) {
  const stats = useMemo(() => {
    const totalPopulation = states.reduce((sum, s) => sum + s.population, 0);
    const totalArea = states.reduce((sum, s) => sum + s.area, 0);
    return [
      { label: 'States & UTs', value: states.length, icon: '📍' },
      { label: 'Monuments', value: monuments.length, icon: '🕌' },
      { label: 'Cities', value: cities.length, icon: '🏙️' },
      { label: 'Population', value: `${(totalPopulation / 100000000).toFixed(1)}Cr+`, icon: '👥' },
      { label: 'Area', value: `${(totalArea / 1000000).toFixed(1)}M km²`, icon: '🗺️' },
    ];
  }, [states, monuments, cities]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none"
    >
      <div className="flex flex-wrap gap-2 p-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{stat.icon}</span>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
