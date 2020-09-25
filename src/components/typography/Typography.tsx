import React from 'react';
import {Variant} from './typographyVariants';
import {TextAlign, variantTagMap} from './Typography.style';

export interface Props {
  variant: Variant;
  children: string | number;
  textAlign?: TextAlign;
}

function Typography({textAlign, variant, children}: Props): JSX.Element {
  const Component = variantTagMap[variant];

  return <Component>{children}</Component>;
}

export default Typography;
