import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorWrapper = styled.div`
  padding: 2rem;
  background: #ffebee;
  color: #b71c1c;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
`;

function ErrorMessage({ message }) {
  const errorMessage = typeof message === 'string' 
    ? message
    : message?.message || 'An unknown error occurred';

  return (
    <ErrorWrapper>
      <h3>Something went wrong</h3>
      <p>{errorMessage}</p>
    </ErrorWrapper>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Error),
    PropTypes.shape({
      message: PropTypes.string
    })
  ])
};

export default ErrorMessage;