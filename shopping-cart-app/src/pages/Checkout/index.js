import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CheckoutForm, FormRow, CheckoutContainer } from './styles';

export default function Checkout() {
  const { clearCart, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/checkout/success');
  };

  return (
    <CheckoutContainer>
      <h2>Checkout - Total: ${cartTotal.toFixed(2)}</h2>
      <CheckoutForm onSubmit={handleSubmit}>
        <FormRow>
          <label>Full Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormRow>

        <FormRow>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </FormRow>

        <FormRow>
          <label>Shipping Address:</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </FormRow>

        <button type="submit">Complete Purchase</button>
      </CheckoutForm>
    </CheckoutContainer>
  );
}