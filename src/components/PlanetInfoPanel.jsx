import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiSun, FiWind, FiMoon, FiThermometer, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

export default function PlanetInfoPanel({ planet, isMobile, onClose }) {
  const [expanded, setExpanded] = useState(false);

  if (!planet) return null;

  const stats = [
    { label: 'Distance from Sun', value: planet.distanceFromSun, icon: FiSun },
    { label: 'Mass', value: planet.mass, icon: FiWind },
    { label: 'Radius', value: planet.radius, icon: FiWind },
    { label: 'Temperature', value: planet.temperature, icon: FiThermometer },
    { label: 'Moons', value: planet.moons, icon: FiMoon },
  ];

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 mb-5">
        <motion.div
          key={planet.id + 'icon'}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.05 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{
            backgroundColor: planet.color + '22',
            boxShadow: `0 0 40px ${planet.color}33, inset 0 0 20px ${planet.color}22`,
          }}
        >
          <div
            className="w-10 h-10 md:w-11 md:h-11 rounded-full"
            style={{ backgroundColor: planet.color }}
          />
        </motion.div>
        <div className="min-w-0">
          <motion.h2
            key={planet.id + 'name'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-xl md:text-2xl font-bold text-white truncate"
          >
            {planet.name}
          </motion.h2>
          <motion.p
            key={planet.id + 'sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="text-xs text-gray-400 mb-1"
          >
            {planet.subtitle}
          </motion.p>
          <motion.span
            key={planet.id + 'cat'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.16 }}
            className="text-[10px] text-neon bg-neon/10 px-2.5 py-0.5 rounded-full inline-block border border-neon/20"
          >
            {planet.category}
          </motion.span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {stats.map((s, i) => (
          <motion.div
            key={planet.id + s.label}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            className="relative"
          >
            <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] relative overflow-hidden">
              <div className="flex items-center gap-2.5">
                <s.icon className="text-neon text-xs flex-shrink-0" />
                <span className="text-[11px] text-gray-400">{s.label}</span>
              </div>
              <span className="text-xs text-white font-semibold">{s.value}</span>
            </div>
            {i < stats.length - 1 && (
              <div className="absolute bottom-0 left-8 right-3 h-px bg-gradient-to-r from-neon/20 via-neon/5 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mb-4"
      >
        <p className="text-[12px] text-gray-300 leading-relaxed">
          {planet.description}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-neon/20 to-accent/20 border border-neon/30 text-sm text-white font-medium hover:from-neon/30 hover:to-accent/30 transition-all shadow-glow group"
      >
        <span>View Details</span>
        <FiArrowRight className="text-neon group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );

  const panelContent = (
    <motion.div
      key={planet.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl p-4 md:p-5 overflow-hidden relative"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${planet.color}11, transparent 40%, transparent 60%, ${planet.color}08)`,
        }}
      />
      <div
        className="absolute -top-1 -left-1 -right-1 h-[2px] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${planet.color}66, ${planet.color}, ${planet.color}66, transparent)`,
          animation: 'pulse-soft 3s ease-in-out infinite',
        }}
      />
      <div className="relative z-10">
        {content}
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-2xl"
        style={{
          background: 'rgba(5, 8, 20, 0.97)',
          backdropFilter: 'blur(30px)',
          borderTop: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="w-12 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-white ml-auto">
              <FiMinimize2 className="text-sm" />
            </button>
          )}
        </div>
        <div className="p-4 pt-2">
          {panelContent}
        </div>
      </motion.div>
    );
  }

  return panelContent;
}
