import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function TriviaCard({ fact }) {
  return (
    <div className="glass-card rounded-2xl p-4 h-full relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 40%, #3B82F6 0%, transparent 55%), radial-gradient(circle at 75% 70%, #F59E0B 0%, transparent 45%)',
        }}
      />
      <div
        className="absolute -inset-20 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(2px 2px at 20% 30%, #fff, transparent), radial-gradient(2px 2px at 40% 70%, #fff, transparent), radial-gradient(2px 2px at 60% 20%, #fff, transparent), radial-gradient(2px 2px at 80% 60%, #fff, transparent)',
          backgroundSize: '200px 200px',
          animation: 'drift 25s ease-in-out infinite',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <FiStar className="text-accent text-xs" />
          </div>
          <h3 className="text-xs font-bold text-white">Did You Know?</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={fact}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] text-gray-300 leading-relaxed"
          >
            {fact}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
