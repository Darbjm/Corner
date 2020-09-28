import styled from 'styled-components';
import {primaryTheme, secondaryTheme} from '../../styles'

export const sizeMap = {
  small: 28,
  medium: 36,
  large: 42,
};

export type Size = keyof typeof sizeMap | number;

interface GetVariantStylesProps {
  size: number;
}

export type VariantProps = 'borderRadius' | 'padding' | 'height'

const getVariantStyles = (props: GetVariantStylesProps) => ({
  contained: {
    borderRadius: `${props.size / 2}px`,
    height: `${props.size}px`,
    padding: props.size <= sizeMap.small ? '0 10px' : '0 16px',
  },
});

const getVariantProp:string (prop: VariantProps){

}

export const Button = styled.button<{
  // variant: Variant;
  // colorType: ColorTypeKey;
  fullWidth: boolean;
  size: number;
}>`
  appearance: none;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  width: ${({fullWidth}): string => (fullWidth ? '100%' : 'fit-content')};
  border-radius: ${getVariantProp('borderRadius')};
  padding: ${getVariantProp('padding')};
  height: ${getVariantProp('height')};
  background-color: ${getColorType(defaultButtonColorType, 'main')};
  color: ${getColorType(defaultButtonColorType, 'contrastText')};

  :hover {
    background-color: ${getColorType(defaultButtonColorType, 'hover')};
  }

  :active {
    background-color: ${getColorType(defaultButtonColorType, 'active')};
  }

  :focus {
    background-color: ${getColorType(defaultButtonColorType, 'focus')};
    outline-color: ${getColorType(defaultButtonColorType, 'focus')};
    outline-offset: 1px;
    outline-style: solid;
  }

  :disabled {
    background-color: ${getColorType(defaultButtonColorType, 'disabled')};
    color: ${getColorType(defaultButtonColorType, 'disabledText')};
    cursor: default;
  }
`;
