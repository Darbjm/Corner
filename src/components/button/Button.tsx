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
  handleClick?: () => void;
}

const SimpleButton = ({color, isFullWidth, buttonSize, children, ...props}: Props): JSX.Element => {
  const textSize = buttonSize === 'large' ? 'bodyLarge' : 'bodyMedium';
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.handleClick) return props.handleClick();
  };
  return (
    <Button size={buttonSize} fullWidth={isFullWidth} colorType={color} onClick={handleClick}>
      <Typography variant={textSize}>{children}</Typography>
    </Button>
  );
};

export default SimpleButton;
