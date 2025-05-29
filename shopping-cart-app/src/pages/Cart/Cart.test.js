import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import Cart from './index';

const mockCartItems = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.00,
    quantity: 2,
    image: '/assets/images/card-1.jpg'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 15.00,
    quantity: 1,
    image: '/assets/images/card-1.jpg'
  }
];

describe('Cart Page', () => {
  beforeEach(() => {
    localStorage.setItem('cart', JSON.stringify(mockCartItems));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('displays empty cart message when no items', () => {
    localStorage.removeItem('cart');
    render(<Cart />);
    
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /proceed to checkout/i })).not.toBeInTheDocument();
  });

  test('displays cart items when items exist', () => {
    render(<Cart />);
    
    mockCartItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
    
    expect(screen.getByText('$35.00')).toBeInTheDocument(); // 10*2 + 15*1
  });

  test('navigates to checkout when Proceed to Checkout is clicked', () => {
    render(<Cart />);
    
    const checkoutButton = screen.getByRole('link', { name: /proceed to checkout/i });
    expect(checkoutButton).toHaveAttribute('href', '/checkout');
  });
});