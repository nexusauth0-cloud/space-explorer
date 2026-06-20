import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/planets')
      .then(res => {
        setPlanets(res.data);
        setSelected(res.data[2]);
        setLoading(false);
      })
      .catch(() => {
        const fallback = [
          { id: 'mercury', name: 'Mercury', subtitle: 'The Swift Planet', distanceFromSun: '57.9 million km', mass: '3.30 × 10^23 kg', radius: '2,440 km', temperature: '-180 to 430°C', moons: 0, category: 'Terrestrial', color: '#9CA3AF', orbitRadius: 10, orbitSpeed: 4.15, size: 0.4, description: 'Mercury is the smallest planet and closest to the Sun.' },
          { id: 'venus', name: 'Venus', subtitle: 'The Evening Star', distanceFromSun: '108.2 million km', mass: '4.87 × 10^24 kg', radius: '6,052 km', temperature: '462°C', moons: 0, category: 'Terrestrial', color: '#E5C07B', orbitRadius: 15, orbitSpeed: 1.62, size: 0.95, description: 'Venus is the hottest planet in our solar system.' },
          { id: 'earth', name: 'Earth', subtitle: 'The Blue Planet', distanceFromSun: '149.6 million km', mass: '5.97 × 10^24 kg', radius: '6,371 km', temperature: '15°C', moons: 1, category: 'Terrestrial', color: '#3B82F6', orbitRadius: 20, orbitSpeed: 1.0, size: 1.0, description: 'Earth is the third planet from the Sun and the only known world to harbor life.' },
          { id: 'mars', name: 'Mars', subtitle: 'The Red Planet', distanceFromSun: '227.9 million km', mass: '6.42 × 10^23 kg', radius: '3,390 km', temperature: '-65°C', moons: 2, category: 'Terrestrial', color: '#EF4444', orbitRadius: 25, orbitSpeed: 0.53, size: 0.53, description: 'Mars is the fourth planet from the Sun with a distinctive reddish appearance.' },
          { id: 'jupiter', name: 'Jupiter', subtitle: 'The Giant Planet', distanceFromSun: '778.5 million km', mass: '1.90 × 10^27 kg', radius: '69,911 km', temperature: '-110°C', moons: 95, category: 'Gas Giant', color: '#D97706', orbitRadius: 35, orbitSpeed: 0.08, size: 2.5, description: 'Jupiter is the largest planet in our solar system.' },
          { id: 'saturn', name: 'Saturn', subtitle: 'The Ringed Planet', distanceFromSun: '1.43 billion km', mass: '5.68 × 10^26 kg', radius: '58,232 km', temperature: '-140°C', moons: 146, category: 'Gas Giant', color: '#D4A574', orbitRadius: 45, orbitSpeed: 0.03, size: 2.0, description: 'Saturn is best known for its spectacular ring system.' },
          { id: 'uranus', name: 'Uranus', subtitle: 'The Ice Giant', distanceFromSun: '2.87 billion km', mass: '8.68 × 10^25 kg', radius: '25,362 km', temperature: '-195°C', moons: 27, category: 'Ice Giant', color: '#67E8F9', orbitRadius: 55, orbitSpeed: 0.01, size: 1.5, description: 'Uranus is an ice giant with a blue-green color.' },
          { id: 'neptune', name: 'Neptune', subtitle: 'The Windy Planet', distanceFromSun: '4.50 billion km', mass: '1.02 × 10^26 kg', radius: '24,622 km', temperature: '-200°C', moons: 16, category: 'Ice Giant', color: '#2563EB', orbitRadius: 65, orbitSpeed: 0.006, size: 1.4, description: 'Neptune has the strongest winds in the solar system.' },
        ];
        setPlanets(fallback);
        setSelected(fallback[2]);
        setLoading(false);
      });
  }, []);

  return { planets, selected, setSelected, loading };
}
