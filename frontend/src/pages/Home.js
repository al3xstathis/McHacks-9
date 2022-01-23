import React from 'react';
import { Container, FlexBox } from "../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Home = (props) => {

    const navigate = useNavigate();

    const messages = [
        {
            sender: "bot@davinci",
            message: "Welcome to HackMyHack!"
        },
        {
            sender: "bot@davinci",
            message: "I will be assisting you through your Hackathon by providing you with a variety of tools that will help you win 1st place."
        },
        {
            sender: "bot@davinci",
            message: "Refer to the table below to see the tools you have access to:"
        }
    ]

    const tableInfo = [
        {
            name: "Idea Generator",
            input: "3 keywords",
            output: "I will output a Hackathon idea based on your keywords"
        },
        {
            name: "Name Generator",
            input: "Description of your Hackathon project",
            output: "I will output a Hackathon name based on your description"
        },
        {
            name: "Bug Fixer",
            input: "First input - language of your code, second input - code with comments explaining what it is supposed to do",
            output: "I will output the fixed code"
        },
        {
            name: "Code Analyzer",
            input: "First input - language of your code, second input - code",
            output: "I will explain what the code is doing"
        },
        {
            name: "Reminder",
            input: "First input - phone number, second input - date and time of presentation",
            output: "I will send you an SMS 30 minutes before your presentation"
        },
        {
            name: "Chatbot",
            input: "Whatever you want :)",
            output: "Whatever I want :)"
        }
    ]

    const handleClick = (name) => {
        switch (name) {
            case "Idea Generator":
                navigate("idea-generator");
                props.tabChange("idea-generator");
                break;
            case "Name Generator":
                navigate("name-generator");
                props.tabChange("name-generator");
                break;
            case "Bug Fixer":
                navigate("bug-analyzer");
                props.tabChange("bug-analyzer");
                break;
            case "Code Analyzer":
                navigate("code-analyzer");
                props.tabChange("code-analyzer");
                break;
            case "Reminder":
                navigate("reminder");
                props.tabChange("reminder");
                break;
            case "Chatbot":
                navigate("chatbot");
                props.tabChange("chatbot");
                break;
        }
    }

    return (
        <Container
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 0.5 }}
            direction={'column'}>
            <div style={{ maxHeight: '70vh', height: '70vh', width: '100%' }}>
                <Messages id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                    style={{ paddingBottom: 20 }}>
                    {messages.map((idea, id) =>
                        <FlexBox key={id}>
                            <Text style={{ display: 'flex', alignSelf: 'flex-start' }}>{idea.sender} ></Text>
                            <Text style={{ maxWidth: '75%', whiteSpace: 'pre-line' }}>{idea.message}</Text>
                        </FlexBox>
                    )}
                </Messages>
            </div>
            <Table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <TH>
                            TOOL NAME
                        </TH>
                        <TH>INPUT</TH>
                        <TH>OUTPUT</TH>
                    </tr >
                </thead >
                <tbody>
                    {tableInfo.map((idea, id) =>
                        <tr style={{ height: '50px' }} key={id}>
                            <TD><Button onClick={() => handleClick(idea.name)}>{idea.name}</Button></TD>
                            <TD>{idea.input}</TD>
                            <TD> {idea.output}</TD>
                        </tr >
                    )}
                </tbody >
            </Table >

        </Container >
    )
}

const Messages = styled(FlexBox)`
`
const Table = styled.table`
border-style: dotted; 
border-color: white; 
border-collapse: collapse;
`

const Button = styled.button`
&:hover {
    color:#05960e;
}
text-align: left;
background: transparent;
color: white;
border-width: 0px;
`
const TH = styled.th`
border-style: dotted; 
border-color: white; 
border-collapse: collapse;
`

const TD = styled.td`
padding-left: 10px;
border-style: dotted; 
border-color: white; 
border-collapse: collapse;
`

const Text = styled.p`
  margin-left: 16px;
  font-size: 18px;
`
