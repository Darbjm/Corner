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
  vertical?: boolean
  handleClick?: (e?: any) => void;
  cursor?: string
}

const Card = ({children, cardWidth, cardHeight, textAlign, vertical, ...props}: Props): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (props.handleClick) return props.handleClick(e);
  };
  return (
      <StyledCard 
      onClick={(e) => handleClick(e)}
      $vertical={vertical}
      $cardWidth={cardWidth} 
      $cardHeight={cardHeight} 
      $textAlign={textAlign}
      $marginBottom={props.marginBottom}
      $marginTop={props.marginTop}
      $marginLeft={props.marginLeft}
      $marginRight={props.marginRight}
      $justifyContent={props.justifyContent}
      $cursor={props.cursor}
      >
        {children}
      </StyledCard>
  );
};

export default Card;
