import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { Toaster } from './components/ui/sonner'
import { Provider } from'react-redux'
import { ThemeProvider } from './components/Theme/Theme.tsx'
import { store } from './store/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Toaster closeButton />
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
