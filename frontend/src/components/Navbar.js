import React, {useEffect, useState} from 'react'
import { RiHome2Fill } from "react-icons/ri";
import { GiSquare } from "react-icons/gi"
import { VscChromeMinimize } from "react-icons/vsc"
import { AiOutlineClose } from "react-icons/ai"
import styled from "styled-components"
import { FlexBox } from "./index"
import { useNavigate } from "react-router-dom";
import { GiEasterEgg } from "react-icons/gi";
import { styles } from "../styles";
import {useHotkeys} from "@mantine/hooks";

const tabs = [
    '', 'idea-generator', 'name-generator', 'bug-analyzer', 'code-analyzer', 'reminder', 'chat-bot', 'egg'
]

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
                    <IdeaGenerator selectedTab={props.selectedTab} onClick={() => handleChange("idea-generator")}>
                        Idea Generator
                    </IdeaGenerator>
                    <NameGenerator selectedTab={props.selectedTab} onClick={() => handleChange("name-generator")}>
                        Name Generator
                    </NameGenerator>
                    <BugAnalyzer selectedTab={props.selectedTab} onClick={() => handleChange("bug-analyzer")}>
                        Bug Fixer
                    </BugAnalyzer >
                    <CodeAnalyzer selectedTab={props.selectedTab} onClick={() => handleChange("code-analyzer")}>
                        Code Analyzer
                    </CodeAnalyzer >
                    <Reminder selectedTab={props.selectedTab} onClick={() => handleChange("reminder")}>
                        Reminder
                    </Reminder>
                    <ChatBot selectedTab={props.selectedTab} onClick={() => handleChange("chat-bot")}>
                        Chat Bot
                    </ChatBot>
                    <CEgg selectedTab={props.selectedTab} onClick={() => handleChange("egg")}>
                        <GiEasterEgg size={20} />
                    </CEgg>
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
background-color: ${props => props.selectedTab === '' && styles.colors.black};
&:hover {
    background-color: ${styles.colors.black};
}
`
const CEgg = styled.button`
padding-top: 3px;
color: white;
background: transparent;
border-width: 0px;
padding-left: 20px;
padding-right: 20px;
background-color: ${props => props.selectedTab === 'egg' && styles.colors.black};
&:hover {
    background-color: ${styles.colors.black};
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
    background-color: ${styles.colors.black};
}
`

const IdeaGenerator = styled(FeatureButton)`
background-color: ${props => props.selectedTab === 'idea-generator' && styles.colors.black};
`
const NameGenerator = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `name-generator` && styles.colors.black};
`
const CodeAnalyzer = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `code-analyzer` && styles.colors.black};
`
const BugAnalyzer = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `bug-analyzer` && styles.colors.black};
`
const Reminder = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `reminder` && styles.colors.black};
`
const ChatBot = styled(FeatureButton)`
background-color: ${props => props.selectedTab === `chat-bot` && styles.colors.black};
`

const CFlexBox = styled(FlexBox)`
justify-content: space-between;
border: 1px solid ${styles.colors.black};
align-items: stretch;
background-color: #3e413e;
height: 5vh;
`

const WindowsIcons = styled(FlexBox)`
justify-content: flex-end;
gap: 15px;
margin-right: 15px;
color: white;
`