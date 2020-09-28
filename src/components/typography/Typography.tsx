import React from 'react';
import {components, TextAlign, Variant} from './Typography.style';

export interface Props {
  variant: Variant;
  children: string | number;
  target?: '_blank';
  href?: string;
  align?: TextAlign;
  color?: 'primary';
}

function Typography({variant, children, ...props}: Props): JSX.Element {
  const Component: any = variant && components[variant];

  return <Component {...props}>{children}</Component>;
}

export default Typography;
