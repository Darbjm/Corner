import styled from "styled-components";
import { justifyContent } from './Card';

const Align = {
    center: 'center',
    right: 'right',
}

export const StyledCard = styled.div<{
    $vertical?: boolean;
    $cardWidth?: string; 
    $cardHeight?: string;
    $textAlign?: 'center' | 'right'
    $marginBottom?: string;
    $marginTop?: string;
    $marginLeft?: string;
    $marginRight?: string;
    $justifyContent?: justifyContent;
    $cursor?: string;
}>`
    display: flex;
    align-items: center;
    justify-content: ${({$justifyContent}) => $justifyContent};
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 4px;
    background-color: white;
    flex-direction: ${({$vertical}): string => $vertical ? `column` : `row`};
    padding: 10px;
    cursor: ${({$cursor}) => $cursor ? `${$cursor}` : 'auto'};
    text-align: ${({$textAlign}) => $textAlign ? `${Align[$textAlign]}` : 'left'};
    width: ${({$cardWidth}) => $cardWidth ? `${$cardWidth}` : null};
    height: ${({$cardHeight}) => $cardHeight ? `${$cardHeight}` : null};
    margin-bottom: ${({$marginBottom}) => $marginBottom ? `${$marginBottom}` : null};
    margin-top: ${({$marginTop}) => $marginTop ? `${$marginTop}` : null};
    margin-right: ${({$marginRight}) => $marginRight ? `${$marginRight}` : null};
    margin-left: ${({$marginLeft}) => $marginLeft ? `${$marginLeft}` : null};
  `;