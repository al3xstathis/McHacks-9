import React, { useEffect, useState } from 'react';
import { Container, FlexBox } from "../components";
import { HiOutlineChevronRight } from "react-icons/hi";
import styled from "styled-components";
import API from "../api/api";
import { styles } from "../styles";

export const CodeAnalyzer = () => {
    const [input, setInput] = useState('')
    const [language, setLanguage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [valueType, setValueType] = useState('language')
    const [payload, setPayload] = useState({})
    const [messages, setMessages] = useState([
        {
            sender: "bot@davinci",
            message: "This is the code analyzer program."
        },
        {
            sender: "bot@davinci",
            message: "I'll explain to you any code you don't understand."
        },
        {
            sender: "bot@davinci",
            message: "First, enter the language of the code you wish to analyze/understand."
        }
    ])

    const submitLanguage = () => {
        const message = {
            sender: 'user@McHacks/codeanalyzer',
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
                sender: 'bot@davinci',
                message: 'Second, enter the code you wish to analyze/understand (max number of characters: 2500).'
            }
            setMessages([
                ...messages, message
            ])
        }
    }, [valueType])

    const submitCode = () => {
        const message = {
            sender: 'user@McHacks/codeanalyzer',
            message: input
        }
        setMessages([
            ...messages, message
        ])

        if (input.length > 2500) {
            const message = {
                sender: 'bot@davinci',
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
        if (disabled) {
            setTimeout(() => {
                setDisabled(false)
            }, 3000)
        }
    }, [disabled])

    useEffect(() => {
        if (!!payload.language && !!payload.code) {
            analyzeCode()
        }
    }, [payload])

    const analyzeCode = () => {
        setLoading(true)
        API.post(`/analyzeCode`, payload).then((res) => {
            let message = {
                sender: 'bot@davinci',
                message: res.data.description
            }
            setMessages([
                ...messages, message
            ])
            setPayload({})
            setMessages([
                ...messages, message
            ])
            setValueType('language')
            setLoading(false)
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

    useEffect(() => {
        var elem = document.getElementById('scroll');
        elem.scrollTop = elem.scrollHeight;
    }, [messages])

    return (
        <Container
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 0.5 }}
            direction={'column'}>
            <div id="scroll" style={{ maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%' }}>
                <Messages id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                    style={{ paddingBottom: 20 }}>
                    {messages.map((idea, id) =>
                        <FlexBox key={id}>
                            <Text style={{ display: 'flex', alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>{idea.sender} ></Text>
                            <Text style={{ maxWidth: '95%', whiteSpace: 'pre-line' }}>{idea.message}</Text>
                        </FlexBox>
                    )}
                </Messages>
            </div>
            <InputContainer align={'center'} justify={'flex-start'}>
                <HiOutlineChevronRight style={{ color: 'white', width: '40px', fontSize: 30, paddingLeft: 20 }} />
                <Input onKeyDown={(e) => {
                    handleKeypress(e)
                }} value={input} onChange={e => setInput(e.target.value)}
                    variant="unstyled" placeholder={loading ? "Loading..." : (valueType === 'language' ? "Input a coding language" : "Input some commented code")} />
            </InputContainer>
        </Container>
    )
};

export default CodeAnalyzer


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
  box-shadow:0 0 0 1px ${styles.colors.black} inset;
  margin-inside: 20px;
  height: 10vh;
  color: white;
    border-top: 1px solid white;

`

const Text = styled.p`
  margin-left: 16px;
  font-size: 18px;
`