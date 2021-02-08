import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type justify = 'center' | 'flex-end' | 'flex-start';

export const Div = styled.div<{
  vertical: boolean;
  width: string;
  height: string;
  justifyContent?: justify;
  alignItems?: justify;
}>`
  display: flex;
  flex-direction: ${({vertical}): string => vertical ? `column` : `row`};
  width: ${({ width }): string => width};
  height: ${({ height }): string => height};
  flex-wrap: wrap;
  justify-content: ${({ justifyContent }): justify => justifyContent ? justifyContent : 'center'};
  align-items: ${({ alignItems }): justify => alignItems ? alignItems : 'center'};;
`;