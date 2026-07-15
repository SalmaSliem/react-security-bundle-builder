import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './styles.css';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:3001';

async function startApplication() {
  const rootElement = document.getElementById('root');
  const root = createRoot(rootElement);

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/catalog`,
    );

    if (!response.ok) {
      throw new Error(
        `Catalog request failed with status ${response.status}`,
      );
    }

    const catalog = await response.json();

    root.render(
      <StrictMode>
        <App catalog={catalog} />
      </StrictMode>,
    );
  } catch (error) {
    console.error('Failed to start application:', error);

    root.render(
      <main
        style={{
          maxWidth: '600px',
          margin: '60px auto',
          padding: '24px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
        }}
      >
        <h1>Unable to load the product catalog</h1>

        <p>
          Make sure the API server is running, then refresh
          the page.
        </p>
      </main>,
    );
  }
}

startApplication();