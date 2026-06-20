import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import SolarSystem from './components/SolarSystem';
import PlanetInfoPanel from './components/PlanetInfoPanel';
import CompareModule from './components/CompareModule';
import TriviaCard from './components/TriviaCard';
import StatsBar from './components/StatsBar';
import { usePlanets } from './hooks/usePlanets';
import { useFacts } from './hooks/useFacts';

export default function App() {
  const { planets, selected, setSelected, loading } = usePlanets();
  const { currentFact } = useFacts();
  const [activeNav, setActiveNav] = useState('Solar System');
  const [compareList, setCompareList] = useState([]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#050814]">
        <div className="text-neon text-xl animate-pulse">Loading Space...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#050814] text-white flex overflow-hidden">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar planets={planets} onSelectPlanet={setSelected} />

        <div className="flex-1 flex overflow-hidden p-4 gap-4">
          <div className="flex-1 relative rounded-2xl overflow-hidden glass glow-border">
            <SolarSystem planets={planets} selected={selected} onSelect={setSelected} />
          </div>

          <div className="w-80 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-1">
            <AnimatePresence mode="wait">
              <PlanetInfoPanel key={selected?.id} planet={selected} />
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-4 px-4">
          <div className="flex-1">
            <CompareModule
              planets={planets}
              compareList={compareList}
              setCompareList={setCompareList}
            />
          </div>
          <div className="w-72 flex-shrink-0">
            <TriviaCard fact={currentFact} />
          </div>
        </div>

        <StatsBar />
      </div>
    </div>
  );
}
