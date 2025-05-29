import React from 'react';
import { Link } from 'react-router-dom';
import { SuccessContainer } from './styles';

export default function CheckoutSuccess() {
  return (
    <SuccessContainer>
      <h2>Order Placed Successfully! 🎉</h2>
      <p>Thank you for your purchase. Your items will be shipped soon.</p>
      <Link to="/" className="return-home">
        Continue Shopping
      </Link>
    </SuccessContainer>
  );
}