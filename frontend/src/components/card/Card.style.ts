import styled from "styled-components";

const Align = {
    center: 'center',
    right: 'right',
}

export const StyledCard = styled.div<{
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
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 4px;
    background-color: white;
    flex-direction: column;
    padding: 10px;
    text-align: ${({$textAlign}) => $textAlign ? `${Align[$textAlign]}` : 'left'};
    width: ${({$cardWidth}) => $cardWidth ? `${$cardWidth}` : null};
    height: ${({$cardHeight}) => $cardHeight ? `${$cardHeight}` : null};
    margin-bottom: ${({$marginBottom}) => $marginBottom ? `${$marginBottom}` : null};
    margin-top: ${({$marginTop}) => $marginTop ? `${$marginTop}` : null};
    margin-right: ${({$marginRight}) => $marginRight ? `${$marginRight}` : null};
    margin-left: ${({$marginLeft}) => $marginLeft ? `${$marginLeft}` : null};
  `;