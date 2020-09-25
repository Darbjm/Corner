import {variantStyles, Variant} from './typographyVariants';

export type TextAlign = 'left' | 'right' | 'center';

export type Tag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'div';

export const variantTagMap: {[K in Variant]: Tag} = {
  bodyMedium: 'p',
  bodySmall: 'p',
  bodyLarge: 'p',
  h2: 'h2',
  h4: 'h4',
  caption: 'span',
};
