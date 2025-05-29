import styled from 'styled-components';

export const ProductDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductImage = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CategoryBadge = styled.span`
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ category, theme }) => {
    if (category === 'starter-deck') return '#4CAF50';
    if (category === 'expansion-set') return '#2196F3';
    if (category === 'booster-box') return '#FF9800';
    if (category === 'accessories') return '#9C27B0';
    return '#607D8B';
  }};
  color: white;
`;

export const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
`;

export const AddToCartButton = styled.button`
  align-self: flex-start;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

