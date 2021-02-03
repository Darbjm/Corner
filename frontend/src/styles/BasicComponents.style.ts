import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div<{
  vertical: boolean;
  width: string;
  height: string;
}>`
  display: flex;
  flex-direction: ${({vertical}): string => vertical ? `column` : `row`};
  width: ${({ width }): string => width};
  height: ${({ height }): string => height};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`