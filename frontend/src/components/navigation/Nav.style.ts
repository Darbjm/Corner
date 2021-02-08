import styled from "styled-components";
import { MARGIN_LEFT, MARGIN_RIGHT } from '../../styles/variables'
export const Nav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
  `;

export const NavLogo = styled.img`
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    margin-left: ${MARGIN_LEFT}
`

export const NavEnd = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const NavLinks = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: ${MARGIN_RIGHT}
`
