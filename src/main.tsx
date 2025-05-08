
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add base styles to ensure minimal visual styling even if CSS loading fails
const baseStyles = document.createElement('style');
baseStyles.textContent = `
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: sans-serif;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;
document.head.appendChild(baseStyles);

// Safe document ready function
const whenDocumentReady = (callback: () => void) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

whenDocumentReady(() => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Root element not found. Creating a new root element.");
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
    const root = createRoot(newRoot);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});
