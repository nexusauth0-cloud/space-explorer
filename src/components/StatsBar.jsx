import React, { useState, useEffect } from 'react';
import { FiGlobe, FiRadio, FiStar, FiArrowRight } from 'react-icons/fi';

const stats = [
  { label: 'Total Planets', value: '8', icon: FiGlobe },
  { label: 'Missions', value: '150+', icon: FiRadio },
  { label: 'Space Facts', value: '1000+', icon: FiStar },
];

export default function StatsBar() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setAnimated(true); }, []);

  return (
    <div className="px-3 md:px-4 pb-2 md:pb-3 mt-1">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 glass-card rounded-2xl px-3 md:px-5 py-2 md:py-3 flex-1 min-w-0">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                <s.icon className="text-neon text-xs md:text-sm flex-shrink-0" />
                <div className="min-w-0">
                  <p
                    className={`text-sm md:text-[17px] font-bold text-white leading-none transition-all duration-700 ${
                      animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[7px] md:text-[9px] text-gray-500 truncate">{s.label}</p>
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-5 md:h-8 bg-white/[0.06] flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
        <button className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-2xl bg-gradient-to-r from-neon to-accent text-white text-[10px] md:text-xs font-bold hover:opacity-90 transition-all hover:shadow-glow-lg flex-shrink-0 group">
          <span className="hidden md:inline">Explore Universe</span>
          <span className="md:hidden">Explore</span>
          <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
