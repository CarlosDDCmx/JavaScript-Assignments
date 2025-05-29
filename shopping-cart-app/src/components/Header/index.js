import React from 'react';
import { TitleLink, HeaderContainer, NavLink, CartInfo, Title } from './styles';
import { ShoppingCart } from '@styled-icons/material/ShoppingCart';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <HeaderContainer>
      <TitleLink to="/">
        <Title>ShopperMe</Title>
      </TitleLink>
      
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">
          <ShoppingCart size="24" />
          <CartInfo>
            Cart {itemCount > 0 && <span>({itemCount})</span>}
          </CartInfo>
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;