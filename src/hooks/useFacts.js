import { useState, useEffect } from 'react';
import axios from 'axios';

const fallbackFacts = [
  "A day on Venus is longer than a year on Venus.",
  "Neptune has the strongest winds of any planet, reaching up to 2,100 km/h.",
  "Jupiter's Great Red Spot is a storm larger than Earth.",
  "Saturn would float in water — its density is less than water's.",
  "The Sun makes up 99.86% of the total mass of the solar system.",
  "Mars has the tallest mountain — Olympus Mons at 21.9 km.",
  "There are more stars in the universe than grains of sand on Earth.",
  "A year on Mercury is just 88 Earth days.",
  "Uranus rotates on its side with a 98-degree axial tilt.",
  "Venus is the hottest planet at 462°C surface temperature.",
];

export function useFacts() {
  const [facts, setFacts] = useState(fallbackFacts);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('/api/facts')
      .then(res => setFacts(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return { currentFact: facts[currentIndex], facts };
}
