import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiGlobe, FiGrid, FiBarChart2,
  FiRadio, FiStar, FiImage, FiSettings,
  FiMenu, FiX
} from 'react-icons/fi';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setMobileOpen(true)}
        className="mobile-only fixed top-4 left-4 z-50 w-11 h-11 rounded-xl glass flex items-center justify-center text-neon border border-neon/20"
      >
        <FiMenu className="text-lg" />
      </motion.button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="mobile-only fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          left: mobileOpen ? 0 : undefined,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`
          w-[72px] h-screen flex flex-col items-center py-5 gap-0.5
          glass border-r border-neon/10 z-30 flex-shrink-0
          desktop-only
          ${mobileOpen ? 'mobile-only fixed left-0 top-0' : ''}
        `}
      >
        <div className="mb-5 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon to-accent flex items-center justify-center mb-0.5 shadow-glow">
            <FiGlobe className="text-white text-sm" />
          </div>
          <span className="text-[6px] text-gray-400 tracking-[0.2em] font-bold">SPACE</span>
        </div>

        <div className="flex flex-col gap-0.5 w-full px-1.5">
          {navItems.map((item) => {
            const active = activeNav === item.label;
            return (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => { setActiveNav(item.label); setMobileOpen(false); }}
                className={`relative flex flex-col items-center gap-0.5 py-2.5 rounded-lg transition-all duration-300 group
                  ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {active && (
                  <>
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-neon rounded-r-full shadow-glow"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                    <motion.div
                      layoutId="navBg"
                      className="absolute inset-0 bg-gradient-to-r from-neon/12 to-transparent rounded-lg border border-neon/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  </>
                )}
                <item.icon className={`text-base relative z-10 ${active ? 'text-neon drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]' : ''}`} />
                <span className="text-[7px] relative z-10 leading-tight text-center font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="mt-auto mb-6 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white border border-white/10"
          >
            <FiX className="text-sm" />
          </button>
        )}
      </motion.aside>
    </>
  );
}
