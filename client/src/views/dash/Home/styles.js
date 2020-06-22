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

export const ResponseContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 2fr 3fr ;
  grid-template-rows: 1fr;
  box-shadow: 0 0px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.12);
    border-radius: 2px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  margin: 30px;
  
  :hover {
    box-shadow: 0 5px 12px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.12);
  }
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

