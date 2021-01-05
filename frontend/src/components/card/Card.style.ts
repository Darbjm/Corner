import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styled from "styled-components";


export const StyledCard = styled(Card)<{$cardWidth?: string; $cardHeight?: string;}>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: ${({$cardWidth}) => $cardWidth ? `${$cardWidth}` : null};
    height: ${({$cardHeight}) => $cardHeight ? `${$cardHeight}` : null};
  `;