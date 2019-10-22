import styled from 'styled-components';

export const Body = styled.div`
  background-color: ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 300px;
`;
