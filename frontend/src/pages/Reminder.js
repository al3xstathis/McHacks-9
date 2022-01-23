import React, { useEffect, useState } from 'react';
import { Container, FlexBox } from "../components";
import { HiOutlineChevronRight } from "react-icons/hi";
import styled from "styled-components";
import API from "../api/api";
import moment from 'moment'
import { UnstyledButton } from "@mantine/core";
import { styles } from "../styles";

export const Reminder = () => {

    const [payload, setPayload] = useState({
        number: '',
        time: moment().startOf('hour').format('DD/MM/YYYY H:mm')
    })
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([
        {
            sender: "bot@davinci",
            message: "You might need a reminder for when you need to present or submit your Hackathon project."
        },
        {
            sender: "bot@davinci",
            message: "Leave your phone number, and the date/time of your deadline. We'll make sure to remind you 30 minutes before."
        },
        {
            sender: "bot@davinci",
            message: "Powered by Twilio. Please enter the time in this format: '23/01/2022 14:30'"
        }
    ])

    useEffect(() => {
        if (disabled) {
            setTimeout(() => {
                setDisabled(false)
            }, 3000)
        }
    }, [disabled])

    const submit = () => {
        if (!disabled) {
            if (payload.number === '') {
                const message = {
                    sender: 'bot@davinci',
                    message: "Please enter a target phone number."
                }

                setMessages([
                    ...messages, message
                ])

                return
            }

            const message = {
                sender: 'user@McHacks/reminder',
                message: `${payload.number}` + ` | ` + `${payload.time}`
            }
            setMessages([
                ...messages, message
            ])

            setDisabled(true)
            setReminder({ ...payload, time: moment(payload.time, "DD/MM/YYYY HH:mm").format() });
        }
    }

    const setReminder = (body) => {
        setLoading(true)
        API.post(`/reminder`, body).then((res) => {
            const message = {
                sender: 'bot@davinci',
                message: 'Added your reminder.'
            }
            setMessages([
                ...messages, message
            ])
            setPayload({
                number: '',
                time: moment().format('DD/MM/YYYY HH:mm')
            })
            setLoading(false)
        })

    }

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
            <InputContainer align={'center'} justify={'space-between'}>
                <FlexBox>
                    <HiOutlineChevronRight style={{ color: 'white', width: '40px', fontSize: 30, paddingLeft: 20 }} />
                    <Input maxLength={10} value={payload.number} onChange={e => setPayload({
                        ...payload,
                        number: e.target.value
                    })}
                        variant="unstyled" placeholder={loading ? "Loading..." : "514#######"} />
                    <Time type={'date-time-local'} onChange={(e) => setPayload({
                        ...payload,
                        time: e.target.value
                    })} value={payload.time} />
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
  box-shadow:0 0 0 1px ${styles.colors.black} inset;
  margin-inside: 20px;
  height: 10vh;
    border-top: 1px solid white;

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
