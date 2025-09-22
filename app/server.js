const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => res.send('🚀 Demo App up & running! Use /health.'));
app.get('/health', (_req, res) =>
  res.status(200).json({ status: 'ok', ts: new Date().toISOString() })
);

app.listen(port, () => console.log(`Demo app on ${port}`));
