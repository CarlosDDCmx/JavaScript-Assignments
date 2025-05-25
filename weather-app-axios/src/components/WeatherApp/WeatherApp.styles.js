import styled from 'styled-components';
import { theme } from '../../styles/theme';

const getBackgroundColor = ({ weatherCode }) => {
  if (weatherCode <= 1) return theme.colors.sunny;
  if (weatherCode <= 3) return theme.colors.cloudy;
  return theme.colors.default;
};

export const WeatherAppContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.borderRadius.md};
  }

  button {
    padding: 0.5rem 1rem;
    background: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.md};
    cursor: pointer;
  }
`;

export const WeatherDisplay = styled.div`
  background: ${getBackgroundColor};
  padding: 2rem;
  border-radius: ${theme.borderRadius.lg};
  color: white;
  margin-bottom: 2rem;
`;

export const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;