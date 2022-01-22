import React from 'react'
import { RiHome2Fill } from "react-icons/ri";
import { GiSquare } from "react-icons/gi"
import { VscChromeMinimize } from "react-icons/vsc"
import { AiOutlineClose } from "react-icons/ai"
import styled from "styled-components"
import { FlexBox } from "./index"

function Navbar() {
    return (
        <>
            <CFlexBox>
                <Features>
                    <CHome>
                        <RiHome2Fill size={20} />
                    </CHome>
                    <p>|</p>
                    <FeatureButton>
                        Idea Generator
                    </FeatureButton>
                    <p>|</p>
                    <FeatureButton>
                        Bug Analyzer
                    </FeatureButton>
                    <p>|</p>
                    <FeatureButton>
                        Tech Stack Generator
                    </FeatureButton>
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
&:hover {
    background-color: #000000;
}
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