import React from 'react';
import { StyledCard } from './Card.style';
import CardContent from '@material-ui/core/CardContent';

export interface Props {
  children: JSX.Element | JSX.Element[] | string | number;
  cardWidth?: string;
  cardHeight?: string;
}

const Card = ({children, cardWidth, cardHeight}: Props): JSX.Element => {
  return (
      <StyledCard $cardWidth={cardWidth} $cardHeight={cardHeight}>
        <CardContent>{children}</CardContent>
      </StyledCard>
  );
};

export default Card;
