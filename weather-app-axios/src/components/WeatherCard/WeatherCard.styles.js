import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Card = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow: ${theme.shadow.md};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 1rem;
  
  h3 {
    color: ${theme.colors.dark};
    font-size: 1.1rem;
  }
`;

export const TemperatureSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  
  span {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

export const WeatherIcon = styled.div`
  font-size: 3rem;
  text-align: center;
  margin: 1rem 0;
`;