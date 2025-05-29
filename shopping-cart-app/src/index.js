import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);