// vite.config.js — Configuration file for Vite (our build tool and dev server).
// Vite bundles our React code and serves it quickly during development.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The React plugin lets Vite understand .jsx files and React features
  plugins: [react()],
})
