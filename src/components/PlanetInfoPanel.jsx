import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSun, FiWind, FiMoon, FiThermometer } from 'react-icons/fi';

const statIcons = {
  distanceFromSun: FiSun,
  temperature: FiThermometer,
  moons: FiMoon,
  mass: FiWind,
};

export default function PlanetInfoPanel({ planet }) {
  if (!planet) return null;

  const stats = [
    { label: 'Distance from Sun', value: planet.distanceFromSun, icon: FiSun },
    { label: 'Mass', value: planet.mass, icon: FiWind },
    { label: 'Radius', value: planet.radius, icon: FiWind },
    { label: 'Temperature', value: planet.temperature, icon: FiThermometer },
    { label: 'Moons', value: planet.moons, icon: FiMoon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-5 glow-border overflow-hidden"
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full flex-shrink-0"
          style={{ backgroundColor: planet.color, boxShadow: `0 0 30px ${planet.color}44` }}
        />
        <div>
          <h2 className="text-xl font-bold text-white">{planet.name}</h2>
          <p className="text-xs text-gray-400">{planet.subtitle}</p>
          <span className="text-[10px] text-neon bg-neon/10 px-2 py-0.5 rounded-full mt-1 inline-block">
            {planet.category}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/5"
          >
            <div className="flex items-center gap-2">
              <s.icon className="text-neon text-xs" />
              <span className="text-[11px] text-gray-400">{s.label}</span>
            </div>
            <span className="text-xs text-white font-medium">{s.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[12px] text-gray-300 leading-relaxed mb-4"
      >
        {planet.description}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.02, gap: '8px' }}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-neon/20 to-accent/20 border border-neon/30 text-sm text-white font-medium hover:from-neon/30 hover:to-accent/30 transition-all"
      >
        View Details
        <FiArrowRight className="text-neon" />
      </motion.button>
    </motion.div>
  );
}
