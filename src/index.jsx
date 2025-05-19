import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Importe seu CSS global (se necessário)
import App from './App.jsx'; // Importe o componente App

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);