import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import ProductCard from './index';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: '/assets/images/card-1.jpg',
  description: 'Test description',
  category: 'test-category'
};

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.image);
  });

  test('links title to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const titleLink = screen.getByRole('link', { name: mockProduct.title });
    expect(titleLink).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  test('calls addItem when Add to Cart button is clicked', () => {
    render(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);
    
    // Verify cart context update
    const cartItems = JSON.parse(localStorage.getItem('cart') || []);
    expect(cartItems).toContainEqual(expect.objectContaining({ id: mockProduct.id }));
  });
});