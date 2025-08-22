import { createRoot } from 'react-dom/client';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <Toaster richColors closeButton position='top-right' offset={24} />
  </>
);
