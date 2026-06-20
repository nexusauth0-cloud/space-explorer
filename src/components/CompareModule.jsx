import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompareModule({ planets, compareList, setCompareList }) {
  const toggleCompare = (planet) => {
    if (compareList.find(p => p.id === planet.id)) {
      setCompareList(compareList.filter(p => p.id !== planet.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, planet]);
    }
  };

  return (
    <div className="glass rounded-2xl p-4 glow-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white">Compare Planets</h3>
        <span className="text-[10px] text-gray-500">{compareList.length}/3 selected</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {planets.map(p => {
          const selected = compareList.find(c => c.id === p.id);
          return (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCompare(p)}
              className={`flex-shrink-0 w-24 p-3 rounded-xl border transition-all duration-300 text-center
                ${selected
                  ? 'bg-neon/15 border-neon/50 shadow-glow'
                  : 'bg-white/5 border-white/10 hover:border-white/30'}`}
            >
              <div
                className="w-8 h-8 rounded-full mx-auto mb-2 transition-transform duration-300"
                style={{
                  backgroundColor: p.color,
                  boxShadow: selected ? `0 0 15px ${p.color}66` : 'none',
                  transform: selected ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <p className="text-[10px] font-medium text-white truncate">{p.name}</p>
              <p className="text-[8px] text-gray-500 truncate">{p.category}</p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <div className="flex gap-2 mb-3">
              {compareList.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 text-center"
                >
                  <div className="w-6 h-6 rounded-full mx-auto mb-1" style={{ backgroundColor: p.color }} />
                  <p className="text-[9px] font-medium text-white">{p.name}</p>
                  <p className="text-[8px] text-gray-500">Radius: {p.radius}</p>
                  <p className="text-[8px] text-gray-500">Moons: {p.moons}</p>
                  <p className="text-[8px] text-gray-500">{p.temperature}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-neon to-accent text-white text-xs font-bold tracking-wider"
            >
              Compare Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
