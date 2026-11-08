import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// বাংলা ফন্ট অ্যাপের সাথেই থাকে (বাইরের সার্ভার থেকে আনতে হয় না), তাই দুর্বল নেটেও কাজ করে
import '@fontsource/noto-sans-bengali/400.css'
import '@fontsource/noto-sans-bengali/700.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
