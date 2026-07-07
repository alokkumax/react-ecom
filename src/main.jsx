// main.jsx — The JavaScript entry point for ShoppyGlobe.
// This file connects React to the HTML page and renders the router.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router/router.jsx'

// Find the <div id="root"> in index.html and render the app inside it
createRoot(document.getElementById('root')).render(
  // StrictMode helps catch common React mistakes during development
  <StrictMode>
    {/* RouterProvider reads the URL and shows the matching route component */}
    <RouterProvider router={router} />
  </StrictMode>,
)
