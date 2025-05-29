import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  min-height: 60vh;
  
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <h1>404</h1>
      <p>Page Not Found</p>
    </Container>
  );
}