import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { AgentProvider } from './context/AgentContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgentProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames:{
            error: "bg-red-500/80! text-white! border-red-600!",
                  success: "bg-green-500! text-white! border-green-600!",
          },
          closeButton: true,  
        }}
        richColors
      />
    </AgentProvider>
  </StrictMode>,
)
