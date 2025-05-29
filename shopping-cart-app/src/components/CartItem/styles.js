import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  animation: fadeIn 0.3s ease-in;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const ProductLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    color: ${({ theme }) => theme.colors.secondary};
    
    h4 {
      text-decoration: underline;
    }
  }
  
  img {
    transition: transform 0.2s;
    border-radius: 4px;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;