import React from 'react';
import { Button } from './Button.style';
import { Size } from './Button.style';
import { ColorTypeKey } from '../../styles/theme';

export interface Props {
  children: string | number | JSX.Element | JSX.Element[];
  buttonSize: Size;
  color: ColorTypeKey;
  isFullWidth: boolean;
  font?: 'primary';
  type?: 'submit';
  style?: React.CSSProperties;
  disabled?: boolean;
  handleClick?: (e?: any) => void;
}

const SimpleButton = ({color, isFullWidth, buttonSize, children, disabled, ...props}: Props): JSX.Element => {
  const textSize = buttonSize === 'large' ? 'bodyLarge' : 'bodyMedium';
  const textColor = color === 'primary' ? 'secondary' : 'primary';
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (props.handleClick) return props.handleClick(e);
  };
  return (
    <Button {...props} font={props.font} size={buttonSize} fullWidth={isFullWidth} colorType={color} onClick={(e) => handleClick(e)} disabled={disabled}>
      {children}
    </Button>
  );
};

export default SimpleButton;
