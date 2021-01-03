import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: ${props => props.vertical ? "column" : "row"}
`;
