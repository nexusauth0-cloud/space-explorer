import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiGlobe, FiGrid, FiBarChart2, FiRadio, FiStar, FiImage, FiSettings } from 'react-icons/fi';

const navItems = [
  { label: 'Home', icon: FiHome },
  { label: 'Solar System', icon: FiGlobe },
  { label: 'Planets', icon: FiGrid },
  { label: 'Compare', icon: FiBarChart2 },
  { label: 'Missions', icon: FiRadio },
  { label: 'Space Facts', icon: FiStar },
  { label: 'Gallery', icon: FiImage },
  { label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 h-screen flex flex-col items-center py-6 gap-1 glass border-r border-neon/10 z-20 flex-shrink-0"
    >
      <div className="mb-6 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon to-accent flex items-center justify-center mb-1 shadow-glow">
          <FiGlobe className="text-white text-lg" />
        </div>
        <span className="text-[7px] text-gray-400 tracking-widest font-bold">SPACE</span>
      </div>

      <div className="flex flex-col gap-1 w-full px-2">
        {navItems.map(item => {
          const active = activeNav === item.label;
          return (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveNav(item.label)}
              className={`relative flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-300 group
                ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {active && (
                <motion.div
                  layoutId="navGlow"
                  className="absolute inset-0 bg-neon/10 rounded-xl border border-neon/30 shadow-glow"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`text-lg relative z-10 ${active ? 'text-neon' : ''}`} />
              <span className="text-[8px] relative z-10 leading-tight text-center">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.aside>
  );
}
