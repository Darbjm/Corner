import styled from 'styled-components';
import {colors, ColorTypeKey} from '../../styles/theme';

export const sizeMap = {
  small: 28,
  medium: 36,
  large: 42,
};

export type Size = keyof typeof sizeMap;

export const Button = styled.button<{
  colorType: ColorTypeKey;
  fullWidth: boolean;
  size: Size;
}>`
  appearance: none;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  color: ${({colorType}): string => `${colors[colorType]['contrastText']}`};
  width: ${({fullWidth}): string => (fullWidth ? '100%' : 'fit-content')};
  border-radius: ${({size}): string => `${sizeMap[size] / 5}px`};
  padding: ${({size}): string => (size === 'small' ? '0 10px' : '0 16px')};
  height: ${({size}): string => `${sizeMap[size]}px`};
  background-color: ${({colorType}): string => `${colors[colorType]['main']}`};

  :hover {
    background-color: ${({colorType}): string => `${colors[colorType]['hover']}`};
  }

  :active {
    background-color: ${({colorType}): string => `${colors[colorType]['active']}`};
  }

  :focus {
    background-color: ${({colorType}): string => `${colors[colorType]['focus']}`};
    outline-color: ${({colorType}): string => `${colors[colorType]['focus']}`};
    outline-offset: 1px;
    outline-style: solid;
  }
`;
