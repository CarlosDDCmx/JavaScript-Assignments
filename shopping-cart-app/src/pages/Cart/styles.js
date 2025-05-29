import styled from 'styled-components';

export const CartWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  
  .cart-actions {
    margin-top: 2rem;
    text-align: right;
  }

  .checkout-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 1rem;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Total = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
  margin-top: 2rem;
`;