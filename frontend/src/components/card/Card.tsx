import React from 'react';
import { StyledCard } from './Card.style';

export type justifyContent = 'center' | 'space-evenly' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end'

export interface Props {
  children: JSX.Element | JSX.Element[] | string | number;
  justifyContent?: justifyContent
  cardWidth?: string;
  cardHeight?: string;
  textAlign?: 'center' | 'right';
  marginBottom?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
}

const Card = ({children, cardWidth, cardHeight, textAlign, ...props}: Props): JSX.Element => {
  return (
      <StyledCard $cardWidth={cardWidth} $cardHeight={cardHeight} $textAlign={textAlign}
      $marginBottom={props.marginBottom}
      $marginTop={props.marginTop}
      $marginLeft={props.marginLeft}
      $marginRight={props.marginRight}
      $justifyContent={props.justifyContent}
      >
        {children}
      </StyledCard>
  );
};

export default Card;
