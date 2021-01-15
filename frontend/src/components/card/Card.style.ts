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
    $marginBottom?: string;
    $marginTop?: string;
    $marginLeft?: string;
    $marginRight?: string;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: ${({$textAlign}) => $textAlign ? `${Align[$textAlign]}` : 'left'};
    width: ${({$cardWidth}) => $cardWidth ? `${$cardWidth}` : null};
    height: ${({$cardHeight}) => $cardHeight ? `${$cardHeight}` : null};
    margin-bottom: ${({$marginBottom}) => $marginBottom ? `${$marginBottom}` : null};
    margin-top: ${({$marginTop}) => $marginTop ? `${$marginTop}` : null};
    margin-right: ${({$marginRight}) => $marginRight ? `${$marginRight}` : null};
    margin-left: ${({$marginLeft}) => $marginLeft ? `${$marginLeft}` : null};
  `;