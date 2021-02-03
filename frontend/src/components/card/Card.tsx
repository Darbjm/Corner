import React from 'react';
import { StyledCard } from './Card.style';

export interface Props {
  children: JSX.Element | JSX.Element[] | string | number;
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
      >
        {children}
      </StyledCard>
  );
};

export default Card;
