import React from 'react';
import {components, TextAlign, Variant} from './Typography.style';
import {ColorTypeKey} from '../../styles/theme';

export interface Props {
  variant: Variant;
  children: string | number | JSX.Element | JSX.Element[];
  target?: '_blank';
  href?: string;
  align?: TextAlign;
  color?: ColorTypeKey;
}

const Typography = ({variant, children, ...props}: Props): JSX.Element => {
  const Component: any = variant && components[variant];

  return <Component {...props}>{children}</Component>;
};

export default Typography;
