import React from 'react';
import {components, TextAlign, Variant} from './Typography.style';
import {ColorTypeKey} from '../../styles/theme';
import '../../styles/Font.css'

export interface Props {
  variant: Variant;
  children: string | number | JSX.Element | JSX.Element[];
  font?: 'header';
  target?: '_blank';
  href?: string;
  align?: TextAlign;
  color?: ColorTypeKey;
}

const Typography = ({variant, children, href, ...props}: Props): JSX.Element => {
  const Component: any = variant && components[variant];

  return <Component {...props} href={href} target="_blank">{children}</Component>
};

export default Typography;
