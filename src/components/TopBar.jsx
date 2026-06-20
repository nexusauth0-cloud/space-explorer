import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiStar, FiBell, FiUser } from 'react-icons/fi';

export default function TopBar({ planets, onSelectPlanet }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? planets.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="h-16 flex items-center px-4 md:px-6 gap-3 md:gap-6 glass border-b border-neon/10 z-10">
      <div className="relative flex-1 max-w-md">
        <motion.div
          animate={{
            boxShadow: focused
              ? '0 0 25px rgba(59, 130, 246, 0.25), 0 0 50px rgba(59, 130, 246, 0.1)'
              : '0 0 0px rgba(59, 130, 246, 0)',
          }}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-400
            ${focused
              ? 'bg-neon/[0.08] border-neon/40'
              : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'}
            border backdrop-blur-xl`}
        >
          <motion.div
            animate={{ rotate: focused ? 0 : 0, scale: focused ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <FiSearch className={`text-sm transition-colors ${focused ? 'text-neon' : 'text-gray-500'}`} />
          </motion.div>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 180)}
            placeholder="Search planets, missions..."
            className="bg-transparent text-xs md:text-sm text-white placeholder-gray-500/60 outline-none flex-1 min-w-0"
          />
          {!query && !focused && (
            <motion.span
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[10px] text-gray-500/40 hidden md:block pointer-events-none absolute right-4"
            >
              ⌘K
            </motion.span>
          )}
        </motion.div>

        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full mt-2 left-0 right-0 glass rounded-xl overflow-hidden z-50 border border-neon/20 shadow-glow"
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">No planets found</div>
              ) : (
                filtered.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => { onSelectPlanet(p); setQuery(''); inputRef.current?.blur(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neon/10 transition-colors text-sm text-left"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}66` }}
                    />
                    <span className="text-white font-medium">{p.name}</span>
                    <span className="text-gray-500 text-xs ml-auto">{p.category}</span>
                    <span className="text-gray-600 text-[10px]">{p.distanceFromSun}</span>
                  </motion.button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {[FiStar, FiBell, FiUser].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-gray-400 hover:text-neon hover:bg-neon/10 transition-all border border-white/[0.06] hover:border-neon/20 hover:shadow-glow"
          >
            <Icon className="text-sm md:text-base" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
