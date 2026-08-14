import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.css';
import { App } from './app/App';
import { QueryProvider } from './app/providers/QueryProvider';
import { AuthProvider } from './features/authentication/model/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
