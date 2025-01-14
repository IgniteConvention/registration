import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import the main App component
import './index.css'; // Import the global CSS file

// Find the root element in the DOM
const container = document.getElementById('root');

// Use React 18's createRoot API to render the application
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
