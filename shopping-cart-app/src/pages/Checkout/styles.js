import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

export const CheckoutForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const FormRow = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.secondary};
    }
  }

  textarea {
    height: 100px;
    resize: vertical;
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;