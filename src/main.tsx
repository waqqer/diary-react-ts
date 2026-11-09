import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StorageProvider } from './Contexts/StorageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageProvider>
      <App />
    </StorageProvider>
  </StrictMode>,
)
