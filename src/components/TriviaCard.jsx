import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function TriviaCard({ fact }) {
  return (
    <div className="glass rounded-2xl p-4 glow-border h-full relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #3B82F6 0%, transparent 60%), radial-gradient(circle at 70% 80%, #F59E0B 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <FiStar className="text-accent text-sm" />
          <h3 className="text-xs font-bold text-white">Did You Know?</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={fact}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] text-gray-300 leading-relaxed"
          >
            {fact}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
