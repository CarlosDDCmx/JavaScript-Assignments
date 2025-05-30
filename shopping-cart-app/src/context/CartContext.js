import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
      
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
      
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
    case 'CLEAR_CART':
      return [];
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [storedCart] = useLocalStorage('cart', []);
  const [cart, dispatch] = useReducer(cartReducer, storedCart || []);

  const addItem = (product) => 
    dispatch({ type: 'ADD_ITEM', payload: product });
  
  const removeItem = (id) => 
    dispatch({ type: 'REMOVE_ITEM', payload: id });

  const updateQuantity = (id, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  const clearCart = () => 
    dispatch({ type: 'CLEAR_CART' });

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    cartTotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};