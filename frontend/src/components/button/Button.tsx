import React from 'react';
import {Button} from './Button.style';
import Typography from '../typography';
import {Size} from './Button.style';
import {ColorTypeKey} from '../../styles/theme';

export interface Props {
  children: string | number | JSX.Element | JSX.Element[];
  buttonSize: Size;
  color: ColorTypeKey;
  isFullWidth: boolean;
  type?: 'submit'
  disabled?: boolean;
  handleClick?: () => void | undefined;
}

const SimpleButton = ({color, isFullWidth, buttonSize, children, disabled, ...props}: Props): JSX.Element => {
  const textSize = buttonSize === 'large' ? 'bodyLarge' : 'bodyMedium';
  const textColor = color === 'primary' ? 'secondary' : 'primary';
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (props.handleClick) return props.handleClick();
  };
  return (
    <Button size={buttonSize} fullWidth={isFullWidth} colorType={color} onClick={handleClick} disabled={disabled}>
      <Typography color={textColor} variant={textSize}>{children}</Typography>
    </Button>
  );
};

export default SimpleButton;
