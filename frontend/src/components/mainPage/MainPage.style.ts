import styled from "styled-components";

export const MainDiv = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`

export const HeaderMain = styled.header`
  position:fixed;
  top: 0;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 100;
`

export const CenterSection = styled.section<{
  $direction?: 'col';
}>`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: ${({$direction}): string => $direction === 'col' ? 'column' : 'row'};
`