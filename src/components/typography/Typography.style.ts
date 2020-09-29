import styled from 'styled-components';
import {PRIMARY, SECONDARY} from '../../styles';
import {ColorTypeKey} from '../../styles/theme';

export type TextAlign = 'left' | 'right' | 'center' | undefined;

export type Tag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'div';

const setColor = (color: ColorTypeKey) => {
  if (color) {
    if (color === 'primary') return PRIMARY;
    return SECONDARY;
  }
  return undefined;
};

export const components = {
  h1: styled.h1<{align: string; color: ColorTypeKey}>`
    font-size: 32px;
    font-weight: 800;
    line-height: 1.25;
    margin: 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  h2: styled.h2<{align: string; color: ColorTypeKey}>`
    font-size: 24px;
    font-weight: 600;
    line-height: 1.25;
    margin: 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  h4: styled.h4<{align: string; color: ColorTypeKey}>`
    font-size: 24px;
    font-weight: 600;
    line-height: 1.25;
    margin: 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  bodyMedium: styled.p<{align: string; color: ColorTypeKey}>`
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    margin: 10px 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  bodySmall: styled.p<{align: string; color: ColorTypeKey}>`
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5;
    margin: 5px 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  bodyLarge: styled.p<{align: string; color: ColorTypeKey}>`
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    margin: 10px 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  caption: styled.span<{align: string; color: ColorTypeKey}>`
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
  Link: styled.a<{align: string; color: ColorTypeKey}>`
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
    color: ${props => setColor(props.color)};
    text-align: ${props => props.align && props.align};
  `,
};

export type Variant = keyof typeof components;

export type Color = 'main' | undefined;

export const variantTagMap: {[K in Variant]: Tag} = {
  bodyMedium: 'p',
  bodySmall: 'p',
  bodyLarge: 'p',
  h1: 'h1',
  h2: 'h2',
  h4: 'h4',
  caption: 'span',
  Link: 'a',
};
