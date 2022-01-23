import React, { useEffect, useState } from 'react';
import { Container, FlexBox } from "../components";
import { HiOutlineChevronRight } from "react-icons/hi";
import styled from "styled-components";
import API from "../api/api";

export const BugAnalyzer = () => {
    const [input, setInput] = useState('')
    const [language, setLanguage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [valueType, setValueType] = useState('language')
    const [payload, setPayload] = useState({})
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message: "This is your bug fixer assistant."
        },
        {
            sender: "bot",
            message: "I will find the bug in your code and fix it."
        },
        {
            sender: "bot",
            message: "Enter the language of the code you wish to fix."
        }
    ])

    const submitLanguage = () => {
        console.log("language")
        const message = {
            sender: 'user@McHacks/bugfixer',
            message: input
        }
        setMessages([
            ...messages, message
        ])

        setLanguage(input);
        setValueType("code");
        setInput("");
    }

    useEffect(() => {
        if (valueType === "code") {
            const message = {
                sender: 'bot',
                message: 'Enter the code you wish to fix with comments (max number of characters: 2500).'
            }
            setMessages([
                ...messages, message
            ])
        }
    }, [valueType])

    const submitCode = () => {
        const message = {
            sender: 'user@McHacks/bugfixer',
            message: input
        }
        setMessages([
            ...messages, message
        ])

        if (input.length > 2500) {
            const message = {
                sender: 'bot',
                message: 'Please make sure your code is less than 2500 characters. Try again.'
            }
            setMessages([
                ...messages, message
            ])
            return;
        }

        setPayload({
            language: language,
            code: input
        })

        setInput('')
    }

    useEffect(() => {
        if (!!payload.language && !!payload.code ) {
            analyzeCode()
        }
    }, [payload])

    useEffect(() => {
        if(disabled) {
            setTimeout(() => {
                setDisabled(false)
            }, 3000)
        }
    }, [disabled])

    const analyzeCode = () => {
        API.post(`/fixBugs`, payload).then((res) => {
            console.log(res)
            let message = {
                sender: 'bot',
                message: res.data.fixed //fixed
            }
            setMessages([
                ...messages, message
            ])
            setPayload({})
            setMessages([
                ...messages, message
            ])
        })
    }

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13 && disabled === false) {
            if (valueType === "language") {
                submitLanguage();
                setDisabled(true)
            } else {
                submitCode();
                setDisabled(true)
            }
        }
    };

    return (
        <Container
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            direction={'column'}>
            <div style={{ maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%' }}>
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
            <InputContainer align={'center'} justify={'flex-start'}>
                <HiOutlineChevronRight style={{ color: 'white', width: '40px', fontSize: 30, paddingLeft: 20 }} />
                <Input onKeyDown={(e) => {
                    handleKeypress(e)
                }} value={input} onChange={e => setInput(e.target.value)}
                    variant="unstyled" placeholder={"Add an Idea"} />
            </InputContainer>
        </Container>
    )
};

export default BugAnalyzer


const Messages = styled(FlexBox)`
`

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 100%;
  color: white;
  &:focus {
    outline: none;
  }
  &::placeholder {
  color: white;
  opacity: 0.8;
  }
`

const InputContainer = styled(FlexBox)`
  width: 100%;
  box-shadow:0 0 0 1px black inset;
  margin-inside: 20px;
  height: 10vh;
  color: white;
`

const Text = styled.p`
  margin-left: 16px;
  font-size: 18px;
`