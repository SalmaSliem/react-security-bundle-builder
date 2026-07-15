const express = require('express');
const cors = require('cors');
const fs = require('node:fs/promises');
const path = require('node:path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const catalogPath = path.resolve(
  __dirname,
  '../src/data/catalog.json',
);

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'Bundle Builder API is running',
  });
});

app.get('/api/catalog', async (request, response) => {
  try {
    const catalogFile = await fs.readFile(
      catalogPath,
      'utf8',
    );

    const catalog = JSON.parse(catalogFile);

    response.json(catalog);
  } catch (error) {
    console.error('Failed to load catalog:', error);

    response.status(500).json({
      message: 'Failed to load catalog data.',
    });
  }
});
const server = app.listen(PORT, () => {
  console.log(
    `Bundle Builder API running at http://localhost:${PORT}`,
  );
});

server.on('error', (error) => {
  console.error('API server error:', error);
  process.exitCode = 1;
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('API server stopped.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});