import styled from 'styled-components'

export const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.margin || 0};
`;