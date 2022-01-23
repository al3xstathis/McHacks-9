import React from 'react'
import { RiHome2Fill } from "react-icons/ri";
import { GiSquare } from "react-icons/gi"
import { VscChromeMinimize } from "react-icons/vsc"
import { AiOutlineClose } from "react-icons/ai"
import styled from "styled-components"
import { FlexBox } from "./index"
import { useNavigate } from "react-router-dom";

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

const IdeaGenerator = styled(FeatureButton)`
background-color: ${props => props.selectedTab === 'idea-generator' && '#000000'};
`
const NameGenerator = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `name-generator` && '#000000'};
`
const CodeAnalyzer = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `code-analyzer` && '#000000'};
`
const Reminder = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `reminder` && '#000000'};
`

const CFlexBox = styled(FlexBox)`
justify-content: space-between;
border: 1px solid black;
align-items: stretch;
background-color: #535652;
height: 6.5vh;
`

const WindowsIcons = styled(FlexBox)`
justify-content: flex-end;
gap: 15px;
margin-right: 15px;
color: white;
`

function Navbar(props) {
    const navigate = useNavigate();

    const handleChange = (route) => {
        navigate(route)
        props.tabChange(route)
    }

    return (
        <>
            <CFlexBox>
                <Features>
                    <CHome selectedTab={props.selectedTab} onClick={() => handleChange("")}>
                        <RiHome2Fill size={20} />
                    </CHome>
                    <p>|</p>
                    <IdeaGenerator selectedTab={props.selectedTab} onClick={() => handleChange("idea-generator")}>
                        Idea Generator
                    </IdeaGenerator>
                    <p>|</p>
                    <NameGenerator selectedTab={props.selectedTab} onClick={() => handleChange("name-generator")}>
                        Name Generator
                    </NameGenerator>
                    <p>|</p>
                    <CodeAnalyzer selectedTab={props.selectedTab} onClick={() => handleChange("code-analyzer")}>
                        Code Analyzer
                    </CodeAnalyzer >
                    <p>|</p>
                    <Reminder selectedTab={props.selectedTab} onClick={() => handleChange("reminder")}>
                        Reminder
                    </Reminder>
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