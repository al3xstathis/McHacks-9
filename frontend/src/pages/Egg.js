import React, {useState} from 'react'
import {Container, FlexBox} from "../components";
import styled from "styled-components";
import {motion} from "framer-motion";

const Egg = () => {
    const [messages] = useState([
        {
            sender: "bot",
            message: "We hid an easter egg somewhere in this app."
        },
        {
            sender: "bot",
            message: "Take your time and look around you might be able to find something cool."
        }
    ])


    return (
        <>
            <Container
                initial={{opacity: 0.8}}
                animate={{opacity: 0.95}}
                transition={{duration: 0.5}}
                direction={'column'}>
                <div style={{maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%'}}>
                    <FlexBox id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                              style={{ paddingBottom: 20 }}>
                        {messages.map((idea, id) =>
                            <FlexBox
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                key={id}>
                                <Text style={{display: 'flex', alignSelf: 'flex-start'}}>{idea.sender} ></Text>
                                <Text style={{maxWidth: '100%'}}>{idea.message}</Text>
                            </FlexBox>
                        )}
                    </FlexBox>
                </div>
            </Container>
        </>
    )
}

export default Egg

const Text = styled(motion.p)`
  margin-left: 16px;
  font-size: 18px;
`