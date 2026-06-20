import React from 'react';
import { FiGlobe, FiRadio, FiStar, FiArrowRight } from 'react-icons/fi';

const stats = [
  { label: 'Total Planets', value: '8', icon: FiGlobe },
  { label: 'Missions', value: '150+', icon: FiRadio },
  { label: 'Space Facts', value: '1000+', icon: FiStar },
];

export default function StatsBar() {
  return (
    <div className="px-4 pb-3 mt-1">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 glass rounded-2xl px-5 py-3 glow-border flex-1">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="flex items-center gap-2">
                <s.icon className="text-neon text-sm" />
                <div>
                  <p className="text-[17px] font-bold text-white leading-none">{s.value}</p>
                  <p className="text-[9px] text-gray-500">{s.label}</p>
                </div>
              </div>
              {i < stats.length - 1 && <div className="w-px h-8 bg-white/10" />}
            </React.Fragment>
          ))}
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-neon to-accent text-white text-xs font-bold hover:opacity-90 transition-all">
          Explore Universe
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
