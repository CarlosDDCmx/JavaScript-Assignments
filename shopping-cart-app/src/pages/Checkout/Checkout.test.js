import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { useNavigate } from 'react-router-dom';
import Checkout from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockCartItems = [
  {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    quantity: 2,
    image: '/assets/images/card-1.jpg'
  }
];

describe('Checkout Page', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate);
    localStorage.setItem('cart', JSON.stringify(mockCartItems));
    render(<Checkout />);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders order summary correctly', () => {
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText(mockCartItems[0].title)).toBeInTheDocument();
    expect(screen.getByText(`$${(mockCartItems[0].price * mockCartItems[0].quantity).toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText('$59.98')).toBeInTheDocument(); // 29.99 * 2
  });

  test('submits form and clears cart', async () => {
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/shipping address/i), { target: { value: '123 Main St' } });
    
    fireEvent.click(screen.getByRole('button', { name: /complete purchase/i }));
    
    // Verify navigation to success page
    expect(mockNavigate).toHaveBeenCalledWith('/checkout/success');
    
    // Verify cart is cleared
    const cartItems = JSON.parse(localStorage.getItem('cart') || []);
    expect(cartItems).toHaveLength(0);
  });

  test('shows validation errors when form is incomplete', () => {
    fireEvent.click(screen.getByRole('button', { name: /complete purchase/i }));
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/address is required/i)).toBeInTheDocument();
  });
});