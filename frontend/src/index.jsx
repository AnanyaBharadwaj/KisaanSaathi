import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Your app's main CSS
import App from './App';

// Correct import for FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';  // FontAwesome import

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
