import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0 1rem;
    font-weight: bold;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ProductTitle = styled(Link)`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
`;