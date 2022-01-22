import React from 'react'
import { RiHome2Fill } from "react-icons/ri";
import { GiSquare } from "react-icons/gi"
import { VscChromeMinimize } from "react-icons/vsc"
import { AiOutlineClose } from "react-icons/ai"
import styled from "styled-components"
import { FlexBox } from "./index"

const Features = styled(FlexBox)`
align-items: stretch;
`
const CHome = styled.button`
padding-top: 3px;
color: white;
background: transparent;
border-width: 0px;
padding-left: 20px;
padding-right: 20px;
background-color: ${props => props.selectedTab === 'home' && '#000000'};
&:hover {
    background-color: #000000;
}
`
const FeatureButton = styled.button`
background: transparent;
border-width: 0px;
font-size: 16px;
padding-left: 20px;
padding-right: 20px;
color: white;
&:hover {
    background-color: #000000;
}
`

const Feature1 = styled(FeatureButton)`
background-color: ${props => props.selectedTab === 'feature1' && '#000000'};
`
const Feature2 = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `feature2` && '#000000'};
`
const Feature3 = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `feature3` && '#000000'};
`

const CFlexBox = styled(FlexBox)`
justify-content: space-between;
border: 1px solid black;
align-items: stretch;
background-color: #535652;
`

const WindowsIcons = styled(FlexBox)`
justify-content: flex-end;
gap: 15px;
margin-right: 15px;
color: white;
`

function Navbar(props) {

    return (
        <>
            <CFlexBox>
                <Features>
                    <CHome selectedTab={props.selectedTab}>
                        <RiHome2Fill size={20} />
                    </CHome>
                    <p>|</p>
                    <Feature1 selectedTab={props.selectedTab}>
                        Idea Generator
                    </Feature1>
                    <p>|</p>
                    <Feature2 selectedTab={props.selectedTab}>
                        Bug Analyzer
                    </Feature2>
                    <p>|</p>
                    <Feature3 selectedTab={props.selectedTab}>
                        Tech Stack Generator
                    </Feature3>
                </Features>
                <WindowsIcons>
                    <GiSquare></GiSquare>
                    <VscChromeMinimize></VscChromeMinimize>
                    <AiOutlineClose></AiOutlineClose>
                </WindowsIcons>
            </CFlexBox>
        </>
    );
}

export default Navbar;