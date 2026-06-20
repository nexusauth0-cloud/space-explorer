const express = require('express');
const cors = require('cors');
const path = require('path');

const planetRoutes = require('./routes/planets');
const factRoutes = require('./routes/facts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/planets', planetRoutes);
app.use('/api/facts', factRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Space Explorer API running on port ${PORT}`);
});
