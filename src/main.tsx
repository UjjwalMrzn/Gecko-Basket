import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';

// Create root
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

// Render app
root.render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout/>
    </BrowserRouter>
  </StrictMode>
);