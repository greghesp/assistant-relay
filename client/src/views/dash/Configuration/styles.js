import styled from 'styled-components';

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.div`
  width: 50vw;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 20px
`

export const QuietHours = styled.div`
  width: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 20px
`

export const Cast = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 20px
`

export const Switch = styled.div`
  width: 200px
`;

export const Devices = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr .5fr;
  grid-row-gap: 20px;
  grid-column-gap: 10px
`;
