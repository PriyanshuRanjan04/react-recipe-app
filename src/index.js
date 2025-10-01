import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import "./styles/index.scss";
import { applyFestivalTheme } from './utils/festivalTheme'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => { })
  })
}

// Apply festival theme on load
applyFestivalTheme()