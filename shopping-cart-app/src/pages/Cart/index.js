import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { CartWrapper, Total } from './styles';


export default function Cart() {
  const { cart, removeItem, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartWrapper>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
              onUpdate={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}
          <Total>Total: ${total.toFixed(2)}</Total>
        </>
      )}
      {cart.length > 0 && (
        <div className="cart-actions">
          <Total>Total: ${total.toFixed(2)}</Total>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </CartWrapper>
  );
}