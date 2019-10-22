import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: .5fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 20px
`;

export const Switch = styled.div`
  width: 200px
`;


export const JsonBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`