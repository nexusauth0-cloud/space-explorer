import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';

export default function CompareModule({ planets, compareList, setCompareList }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);

  const toggleCompare = (planet) => {
    if (compareList.find(p => p.id === planet.id)) {
      setCompareList(compareList.filter(p => p.id !== planet.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, planet]);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white">Compare Planets</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">{compareList.length}/3 selected</span>
          <button
            onClick={() => setShowTooltip(showTooltip === 'info' ? null : 'info')}
            className="text-gray-500 hover:text-neon transition-colors"
          >
            <FiInfo className="text-xs" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-thin -mx-1 px-1">
        {planets.map((p, idx) => {
          const selected = compareList.find(c => c.id === p.id);
          const isHovered = hoveredPlanet === p.id;
          return (
            <motion.button
              key={p.id}
              layout
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              onHoverStart={() => setHoveredPlanet(p.id)}
              onHoverEnd={() => setHoveredPlanet(null)}
              onClick={() => toggleCompare(p)}
              className={`flex-shrink-0 w-[88px] md:w-24 p-2.5 md:p-3 rounded-xl border transition-all duration-300 text-center relative
                ${selected
                  ? 'bg-neon/[0.12] border-neon/50 shadow-glow'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]'}`}
            >
              <div
                className="w-7 h-7 md:w-8 md:h-8 rounded-full mx-auto mb-1.5 transition-all duration-300"
                style={{
                  backgroundColor: p.color,
                  boxShadow: selected
                    ? `0 0 20px ${p.color}88`
                    : isHovered ? `0 0 12px ${p.color}44` : 'none',
                  transform: selected ? 'scale(1.15)' : isHovered ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <p className="text-[9px] md:text-[10px] font-medium text-white truncate">{p.name}</p>
              <p className="text-[7px] md:text-[8px] text-gray-500 truncate">{p.category}</p>

              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon border-2 border-space text-[8px] flex items-center justify-center font-bold text-white"
                >
                  {compareList.indexOf(p) + 1}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {compareList.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 overflow-hidden"
          >
            <div className="relative">
              <div className="flex gap-2 mb-3">
                {compareList.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ scale: 0.85, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex-1 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center relative"
                  >
                    <div
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full mx-auto mb-1.5"
                      style={{ backgroundColor: p.color, boxShadow: `0 0 15px ${p.color}55` }}
                    />
                    <p className="text-[9px] md:text-[10px] font-medium text-white">{p.name}</p>
                    <div className="mt-1.5 space-y-0.5">
                      <p className="text-[7px] md:text-[8px] text-gray-400">
                        <span className="text-gray-500">Radius: </span>{p.radius}
                      </p>
                      <p className="text-[7px] md:text-[8px] text-gray-400">
                        <span className="text-gray-500">Moons: </span>{p.moons}
                      </p>
                      <p className="text-[7px] md:text-[8px] text-gray-400">
                        <span className="text-gray-500">Temp: </span>{p.temperature}
                      </p>
                    </div>
                    {i < compareList.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-[5px] w-[10px] h-px bg-gradient-to-r from-neon/40 to-neon/10" />
                    )}
                  </motion.div>
                ))}
              </div>

              {compareList.length >= 2 && (
                <div className="flex items-center gap-1 mb-3 px-1">
                  {compareList.slice(0, -1).map((p, i) => (
                    <React.Fragment key={p.id + 'connector'}>
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <div className="flex-1 h-px bg-gradient-to-r from-neon/30 to-neon/10" />
                    </React.Fragment>
                  ))}
                  <div
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: compareList[compareList.length - 1].color }}
                  />
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-neon to-accent text-white text-xs font-bold tracking-wider shadow-glow hover:shadow-glow-lg transition-all"
            >
              Compare Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
