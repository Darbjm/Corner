export const bodyMediumStyles = {
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.5,
  margin: '10px 0',
};

export const variantStyles = {
  bodyMedium: bodyMediumStyles,
  bodySmall: {
    ...bodyMediumStyles,
    fontSize: '13px',
    margin: '5px 0',
  },
  bodyLarge: {
    ...bodyMediumStyles,
    fontSize: '16px',
  },
  h2: {
    ...bodyMediumStyles,
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.25,
    margin: 0,
  },
  h4: {
    ...bodyMediumStyles,
    fontSize: '14px',
    lineHeight: 1.25,
    margin: 0,
  },
  caption: {
    ...bodyMediumStyles,
    fontSize: '10px',
    fontWeight: 400,
    margin: 0,
  },
};

export type Variant = keyof typeof variantStyles;
