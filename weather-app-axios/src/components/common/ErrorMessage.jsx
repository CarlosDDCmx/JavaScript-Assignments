import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ErrorContainer = styled.div`
  padding: 1rem;
  background: ${theme.colors.error}20;
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.error};
  margin: 1rem 0;
  text-align: center;
`;

const ErrorMessage = ({ message }) => (
  <ErrorContainer role="alert">
    ⚠️ {message}
  </ErrorContainer>
);

export default ErrorMessage;