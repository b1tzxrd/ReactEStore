import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Provider as ChakProvider } from './components/ui/provider.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'
import "../firebase.ts"
import AuthProvider from './context/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ChakProvider>
        <QueryClientProvider client={queryClient} >
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakProvider>
    </AuthProvider>
  </StrictMode>
)
