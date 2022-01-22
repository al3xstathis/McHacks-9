import React, {useEffect, useState} from 'react'
import {FlexBox} from "../components";
import styled from 'styled-components'
import {HiOutlineChevronRight} from 'react-icons/hi'
import API from "../api/api";


const NameGenerator = () => {
    const [input, setInput] = useState('')
    const [receiveValue, setReceiveValue] = useState('keywords')
    const [payload, setPayload] = useState({})
    const [messages, setMessages] = useState([
        {
            sender: "Robot",
            message: "This is your name generating assistant."
        },
        {
            sender: "Robot",
            message: "Enter keywords separated by a space that have to do with your idea."
        }
    ])

    useEffect(() => {
        if (receiveValue === 'description') {
            const message = {
                sender: 'Robot',
                message: 'Next add a description to your idea...'
            }
            setMessages([
                ...messages, message
            ])
        }
    }, [receiveValue])

    useEffect(() => {
        if(!!payload.keywords && !!payload.description) {
            findName()
        }
    }, [payload])


    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            if (receiveValue === 'keywords') {
                submitKeywords()
            }
            if (receiveValue === 'description') {
                submitDescription()
            }
        }
    };

    const submitDescription = () => {
        const message = {
            sender: 'User@McHacks9',
            message: input
        }
        setMessages([
            ...messages, message
        ])
        setPayload({
            ...payload,
            description: input
        })
        setInput('')
        setReceiveValue('keywords')
    }

    const findName = () => {
        API.post(`/test`, payload).then((res) => {
            console.log(res)
            const message = {
                sender: 'Robot',
                message: res.data.name
            }
            setMessages([
                ...messages, message
            ])
            setPayload({})
        })
    }

    const submitKeywords = () => {
        const message = {
            sender: 'User@McHacks/namegenerator',
            message: input
        }
        setMessages([
            ...messages, message
        ])
        setPayload({
            ...payload,
            keywords: input.split(' ')
        })
        setInput('')
        setReceiveValue('description')
    }


    return (
        <Container direction={'column'}>
            <div style={{maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%'}}>
                <Messages id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                          style={{paddingBottom: 20}}>
                    {messages.map((idea, id) =>
                        <FlexBox key={id}>
                            <Text>{idea.sender} ></Text>
                            <Text>{idea.message}</Text>
                        </FlexBox>
                    )}
                </Messages>
            </div>
            <InputContainer align={'center'} justify={'flex-start'}>
                <HiOutlineChevronRight style={{color: 'white', width: '40px', fontSize: 30, paddingLeft: 20}}/>
                <Input onKeyDown={(e) => {
                    handleKeypress(e)
                }} value={input} onChange={e => setInput(e.target.value)}
                       variant="unstyled" placeholder={"Add an Idea"}/>
            </InputContainer>
        </Container>
    )
}

export default NameGenerator


const Messages = styled(FlexBox)`
`

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 100%;
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
`

const Text = styled.p`
  margin-left: 16px;
  font-size: 18px;
`

const Container = styled(FlexBox)`
  background-color: grey;
  box-shadow:0 0 0 1px black inset;
  color: white;
  height: 80vh;
overflow: hidden;
`