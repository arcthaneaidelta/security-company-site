import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { UiProvider } from './context/UiContext';
import { AppRouter } from './app/router';
import './styles/tokens.css';
import './styles/base.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UiProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </UiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
