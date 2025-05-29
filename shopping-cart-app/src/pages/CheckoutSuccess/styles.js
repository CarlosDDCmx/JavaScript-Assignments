import styled from 'styled-components';

export const SuccessContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .return-home {
    display: inline-block;
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;