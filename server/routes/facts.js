const express = require('express');
const router = express.Router();
const { getRandomFact, getAllFacts } = require('../controllers/factController');

router.get('/', getAllFacts);
router.get('/random', getRandomFact);

module.exports = router;
