import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import CartItem from './index';

const mockItem = {
  id: 1,
  title: 'Test Item',
  price: 29.99,
  image: '/assets/images/card-1.jpg',
  quantity: 2
};

describe('CartItem Component', () => {
  const mockOnRemove = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(
      <CartItem 
        item={mockItem} 
        onRemove={mockOnRemove}
        onUpdate={mockOnUpdate}
      />
    );
  });

  test('renders item information correctly', () => {
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
    expect(screen.getByAltText(mockItem.title)).toHaveAttribute('src', mockItem.image);
  });

  test('increases quantity when plus button is clicked', () => {
    const plusButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(plusButton);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockItem.quantity + 1);
  });

  test('decreases quantity when minus button is clicked', () => {
    const minusButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(minusButton);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockItem.quantity - 1);
  });

  test('disables minus button when quantity is 1', () => {
    render(
      <CartItem 
        item={{ ...mockItem, quantity: 1 }} 
        onRemove={mockOnRemove}
        onUpdate={mockOnUpdate}
      />
    );
    
    const minusButton = screen.getByRole('button', { name: '-' });
    expect(minusButton).toBeDisabled();
  });

  test('calls onRemove when Remove button is clicked', () => {
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalled();
  });
});