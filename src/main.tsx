/* eslint-disable @typescript-eslint/no-unsafe-call */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)