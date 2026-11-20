import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const rootElement = document.getElementById('root')

if (rootElement.firstElementChild !== null) {
  hydrateRoot(rootElement, <App />)
} else {
  createRoot(rootElement).render(<App />)
}
