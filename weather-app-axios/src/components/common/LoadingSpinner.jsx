import styled from 'styled-components';

const Spinner = styled.div`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;