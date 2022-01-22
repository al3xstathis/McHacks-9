import React, {useEffect, useState} from 'react'
import {FlexBox} from "../components";
import styled from 'styled-components'
import {HiOutlineChevronRight} from 'react-icons/hi'
import API from "../api/api";


const NameGenerator = () => {
    // const getName = useNameGenerator()
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
        console.log(payload)
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
            sender: 'User',
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
        API.post(`/nameGenerator`, payload).then((res) => {
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
            sender: 'User',
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
        <>
            <FlexBox direction={'column'} justify={'flex-end'} align={'flex-start'}
                     style={{height: '90%', overflow: 'auto'}}>
                {messages.map((idea, id) =>
                    <FlexBox key={id}>
                        <Text>{idea.sender} ></Text>
                        <Text>{idea.message}</Text>
                    </FlexBox>
                )}
            </FlexBox>
            <FlexBox align={'center'} style={{height: '10%', paddingLeft: 20}} fluid="true">
                <HiOutlineChevronRight style={{}}/>
                <Input onKeyDown={(e) => handleKeypress(e)} value={input} onChange={e => setInput(e.target.value)}
                       size={'xl'} variant="unstyled" placeholder={"Add an Idea"}/>
            </FlexBox>
        </>
    )
}

export default NameGenerator

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`

const Text = styled.p`
  margin-left: 16px;
`