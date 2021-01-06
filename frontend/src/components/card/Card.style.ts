import Card from '@material-ui/core/Card';
import styled from "styled-components";

const Align = {
    center: 'center',
    right: 'right',
}

export const StyledCard = styled(Card)<{
    $cardWidth?: string; 
    $cardHeight?: string;
    $textAlign?: 'center' | 'right'
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: ${({$textAlign}) => $textAlign ? `${Align[$textAlign]}` : 'left'};
    width: ${({$cardWidth}) => $cardWidth ? `${$cardWidth}` : null};
    height: ${({$cardHeight}) => $cardHeight ? `${$cardHeight}` : null};
  `;