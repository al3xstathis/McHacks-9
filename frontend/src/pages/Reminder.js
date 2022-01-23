import React, {useEffect, useState} from 'react';
import {Container, FlexBox} from "../components";
import {HiOutlineChevronRight} from "react-icons/hi";
import styled from "styled-components";
import API from "../api/api";
import moment from 'moment'
import {UnstyledButton} from "@mantine/core";

export const Reminder = () => {

    const [payload, setPayload] = useState({
        number: '',
        time: moment().format('DD/MM/YYYY H:mm')
    })
    const [disabled, setDisabled] = useState(false)
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message: "You might need a reminder to present your Hackathon project."
        },
        {
            sender: "bot",
            message: "Leave your phone number and when you have to present. We'll make sure to remind you 30 minutes before."
        }
    ])

    useEffect(() => {
        if (disabled) {
            setTimeout(() => {
                setDisabled(false)
            }, 3000)
        }
    }, [disabled])

    const submit = async () => {
        if (!disabled) {
            const message = {
                sender: 'user@McHacks/reminder',
                message: `${payload.number}` + ` | ` + `${payload.time}`
            }
            setMessages([
                ...messages, message
            ])
            setReminder()
            setDisabled(true)
        }
    }


    const setReminder = () => {
        API.post(`/reminder`, payload).then((res) => {
            console.log(res)
            const message = {
                sender: 'bot',
                message: 'Added your reminder.'
            }
            setMessages([
                ...messages, message
            ])
            setPayload({
                number: '',
                time: moment().format('DD/MM/YYYY H:mm')
            })
        })

    }

    return (
        <Container
            initial={{opacity: 0.8}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            direction={'column'}>
            <div style={{maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%'}}>
                <Messages id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                          style={{paddingBottom: 20}}>
                    {messages.map((idea, id) =>
                        <FlexBox key={id}>
                            <Text style={{ display: 'flex', alignSelf: 'flex-start' }}>{idea.sender} </Text>
                            <Text style={{ maxWidth: '75%', whiteSpace: 'pre-line' }}>{idea.message}</Text>
                        </FlexBox>
                    )}
                </Messages>
            </div>
            <InputContainer align={'center'} justify={'space-between'}>
                <FlexBox>
                    <HiOutlineChevronRight style={{color: 'white', width: '40px', fontSize: 30, paddingLeft: 20}}/>
                    <Input maxLength={10} value={payload.number} onChange={e => setPayload({
                        ...payload,
                        number: e.target.value
                    })}
                           variant="unstyled" placeholder={"5141010101"}/>
                    <Time type={'date-time-local'} onChange={(e) => setPayload({
                        ...payload,
                        time: e.target.value
                    })} value={payload.time}/>
                </FlexBox>
                <Button onClick={() => submit()}>Submit</Button>
            </InputContainer>
        </Container>
    )
}


const Messages = styled(FlexBox)`
`

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 30%;
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
`

const Text = styled.p`
  margin-left: 16px;
  font-size: 18px;
`

const Time = styled.input`
color: white;
background-color: transparent;
border: none;
font-size: 18px;
&:focus {
  outline: none;
}
`

const Button = styled(UnstyledButton)`
  color: white;
  font-family: 'Quantico', sans-serif;
  margin-right: 50px;
`
