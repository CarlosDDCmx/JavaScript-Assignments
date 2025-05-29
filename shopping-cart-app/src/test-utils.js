import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from './context/CartContext';
import { theme } from './theme';

const AllProviders = ({ children }) => (
  <Router>
    <ThemeProvider theme={theme}>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  </Router>
);

const customRender = (ui, options) => 
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };