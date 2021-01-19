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
  to?: string;
  handleClick?: () => void;
}

const Typography = ({variant, children, href, to, ...props}: Props): JSX.Element => {
  const blank: string = variant === 'link' ? '_blank' : ''
  const Component: any = variant && components[variant];
  const click = () => {
    if (props.handleClick) return props.handleClick();
  };

  return <Component {...props} to={to} href={href} target={blank} onClick={() => click()}>{children}</Component>
};

export default Typography;
