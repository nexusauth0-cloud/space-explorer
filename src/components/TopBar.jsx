import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiStar, FiBell, FiUser } from 'react-icons/fi';

export default function TopBar({ planets, onSelectPlanet }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = query.trim()
    ? planets.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="h-16 flex items-center px-6 gap-6 glass border-b border-neon/10 z-10">
      <div className="relative flex-1 max-w-md">
        <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300
          ${focused ? 'bg-neon/10 border-neon/40 shadow-glow' : 'bg-white/5 border-white/10'}
          border`}
        >
          <FiSearch className={`text-sm ${focused ? 'text-neon' : 'text-gray-500'}`} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search planets, missions..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
          />
        </div>
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-0 right-0 glass rounded-xl overflow-hidden z-50 border border-neon/20"
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">No planets found</div>
              ) : (
                filtered.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { onSelectPlanet(p); setQuery(''); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neon/10 transition-colors text-sm text-left"
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-white">{p.name}</span>
                    <span className="text-gray-500 text-xs ml-auto">{p.category}</span>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        {[FiStar, FiBell, FiUser].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-neon hover:bg-neon/10 transition-all border border-white/10"
          >
            <Icon className="text-sm" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
