import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './app/router.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { QueryProvider } from './providers/QueryProvider.tsx';
import { Toaster } from './shared/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
