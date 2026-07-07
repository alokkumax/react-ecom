// main.jsx — The JavaScript entry point for ShoppyGlobe.
// This file connects React to the HTML page and renders the router.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import store from './redux/store.js'
import router from './router/router.jsx'

// Find the <div id="root"> in index.html and render the app inside it
createRoot(document.getElementById('root')).render(
  // StrictMode helps catch common React mistakes during development
  <StrictMode>
    {/* Provider makes the Redux store available to all components */}
    <Provider store={store}>
      {/* RouterProvider reads the URL and shows the matching route component */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
