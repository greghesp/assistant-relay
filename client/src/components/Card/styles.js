import styled from 'styled-components'

export const Card = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
  background: white;
  padding:20px 20px;
  border-radius: 2px;
  margin: ${props => props.margin || 0};
`;