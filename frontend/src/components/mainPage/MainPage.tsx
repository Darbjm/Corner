import React from 'react'
import Nav from '../navigation'
import { MainDiv, HeaderMain, CenterSection } from './MainPage.style'

interface Props {
    children: JSX.Element | JSX.Element[] | null
    direction?: 'col'
}


const Main = ({ children, direction }: Props) => {
    return (
        <>
            <HeaderMain>
                <Nav/>
            </HeaderMain>
            <MainDiv>
                <CenterSection $direction={direction} >
                    {children}
                </CenterSection>
            </MainDiv>
        </>
    )
}

export default Main
