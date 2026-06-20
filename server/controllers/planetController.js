const planets = require('../data/planets.json');

exports.getAllPlanets = (req, res) => {
  res.json(planets);
};

exports.getPlanetById = (req, res) => {
  const planet = planets.find(p => p.id === req.params.id);
  if (!planet) return res.status(404).json({ error: 'Planet not found' });
  res.json(planet);
};

exports.comparePlanets = (req, res) => {
  const { ids } = req.query;
  if (!ids) return res.status(400).json({ error: 'Provide planet ids as comma-separated' });
  const idList = ids.split(',').map(id => id.trim().toLowerCase());
  const selected = planets.filter(p => idList.includes(p.id));
  if (selected.length === 0) return res.status(404).json({ error: 'No matching planets found' });
  res.json(selected);
};
