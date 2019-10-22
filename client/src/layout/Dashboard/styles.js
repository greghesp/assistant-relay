import styled from 'styled-components';

export const Body = styled.div`
  background-color: ${(props) => props.theme.background};
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: start;
  justify-content: center;
`;

export const Container = styled.div`
  width: 80vw;
  height: auto;
`;
