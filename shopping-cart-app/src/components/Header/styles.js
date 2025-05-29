import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.secondary} 0%, 
      ${({ theme }) => theme.colors.accent} 100%
    );
  }
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

export const CartInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;

  span {
    background: ${({ theme }) => theme.colors.accent};
    padding: 0.1rem 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
  }
`;

export const TitleLink = styled(Link)`
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.secondary} 0%, 
    ${({ theme }) => theme.colors.accent} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;