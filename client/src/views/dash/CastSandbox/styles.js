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
 background: #f3f3f3;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  white-space: pre;
  padding: 10px 15px;
`;

export const Play = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const QuoteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Response = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ResponseContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 3fr ;
  grid-template-rows: 1fr; 
`;