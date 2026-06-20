const facts = require('../data/facts.json');

exports.getRandomFact = (req, res) => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  res.json({ fact });
};

exports.getAllFacts = (req, res) => {
  res.json(facts);
};
