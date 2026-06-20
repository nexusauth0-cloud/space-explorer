import React, { useState, useCallback, useEffect } from 'react';
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

function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#050814] gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon to-accent animate-pulse shadow-glow-lg" />
      <div className="text-neon text-sm font-medium tracking-wider animate-pulse">
        LOADING SPACE...
      </div>
    </div>
  );
}

export default function App() {
  const { planets, selected, setSelected, loading } = usePlanets();
  const { currentFact } = useFacts();
  const [activeNav, setActiveNav] = useState('Solar System');
  const [compareList, setCompareList] = useState([]);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (mobilePanelOpen) {
      document.body.classList.add('sheet-open');
    } else {
      document.body.classList.remove('sheet-open');
    }
  }, [mobilePanelOpen]);

  const handleSelectPlanet = useCallback((planet) => {
    setSelected(planet);
    if (isMobile) {
      setMobilePanelOpen(true);
    }
  }, [setSelected, isMobile]);

  const handleCloseMobilePanel = useCallback(() => {
    setMobilePanelOpen(false);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="h-screen w-screen bg-[#050814] text-white flex overflow-hidden">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopBar planets={planets} onSelectPlanet={handleSelectPlanet} />

        <div className="flex-1 flex overflow-hidden p-2 md:p-4 gap-2 md:gap-4 min-h-0">
          <div className="flex-1 relative rounded-xl md:rounded-2xl overflow-hidden glass-card min-h-0">
            <SolarSystem planets={planets} selected={selected} onSelect={handleSelectPlanet} />
          </div>

          <div className="desktop-only w-80 flex-shrink-0 flex flex-col gap-4 overflow-y-auto pr-0.5">
            <AnimatePresence mode="wait">
              <PlanetInfoPanel key={selected?.id} planet={selected} />
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-2 md:gap-4 px-2 md:px-4">
          <div className="flex-1 min-w-0">
            <CompareModule
              planets={planets}
              compareList={compareList}
              setCompareList={setCompareList}
            />
          </div>
          <div className="desktop-only w-72 flex-shrink-0">
            <TriviaCard fact={currentFact} />
          </div>
        </div>

        <StatsBar />
      </div>

      <AnimatePresence>
        {isMobile && mobilePanelOpen && selected && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={handleCloseMobilePanel}
            />
            <PlanetInfoPanel
              key={selected.id}
              planet={selected}
              isMobile
              onClose={handleCloseMobilePanel}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
