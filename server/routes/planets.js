const express = require('express');
const router = express.Router();
const { getAllPlanets, getPlanetById, comparePlanets } = require('../controllers/planetController');

router.get('/', getAllPlanets);
router.get('/compare', comparePlanets);
router.get('/:id', getPlanetById);

module.exports = router;
