import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StorageProvider } from './Contexts/StorageContext'
import { SheetProvider } from './Contexts/SheetContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageProvider>
      <SheetProvider>
        <App />
      </SheetProvider>
    </StorageProvider>
  </StrictMode>,
)
