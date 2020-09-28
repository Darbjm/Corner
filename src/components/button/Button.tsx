import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '../typography';
import {Size} from './Button.style';

export interface Props {
  children: string | number;
  onClick: () => void;
  size?: 1 | 2 | 3;
  color?: 'primary';
}

function SimpleButton({color, size, children, ...props}: Props): JSX.Element {
  return (
    <Button onClick={props.onClick} size="large">
      <Typography variant="bodySmall">{children}</Typography>
    </Button>
  );
}

export default SimpleButton;
