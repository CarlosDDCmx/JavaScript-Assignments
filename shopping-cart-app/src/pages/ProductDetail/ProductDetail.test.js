import React from 'react';
import { render, screen, waitFor } from '../test-utils';
import ProductDetail from './index';
import { fetchProduct } from '../../api/products';

jest.mock('../../api/products', () => ({
  fetchProduct: jest.fn(),
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: '/assets/images/card-1.jpg',
  description: 'Test description',
  category: 'test-category'
};

describe('ProductDetail Page', () => {
  beforeEach(() => {
    fetchProduct.mockResolvedValue(mockProduct);
  });

  test('displays loading spinner while fetching data', () => {
    fetchProduct.mockImplementation(() => new Promise(() => {}));
    render(<ProductDetail />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('displays product information when loaded', async () => {
    render(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
      expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.category.replace(/-/g, ' '))).toBeInTheDocument();
      expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.image);
    });
  });

  test('displays error message when fetch fails', async () => {
    fetchProduct.mockRejectedValue(new Error('Product not found'));
    render(<ProductDetail />);
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      expect(screen.getByText(/product not found/i)).toBeInTheDocument();
    });
  });
});