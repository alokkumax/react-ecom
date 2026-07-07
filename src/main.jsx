// main.jsx — The JavaScript entry point for ShoppyGlobe.
// This file connects React to the HTML page and renders our root component.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Find the <div id="root"> in index.html and render the App component inside it
createRoot(document.getElementById('root')).render(
  // StrictMode helps catch common React mistakes during development
  <StrictMode>
    <App />
  </StrictMode>,
)
