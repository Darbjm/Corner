import styled from "styled-components";

export const NavBar = styled.nav<{

}>`
    position:fixed;
    top: 0;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 4px;
    width: 100%;
    display: flex;
    padding: 5px;
    align-items: center;
  `;

export const NavLogo = styled.img`
    max-width: 50px;
    max-height: 50px;
    margin: 0 20px
`

export const NavEnd = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const NavLinks = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-evenly;
`
