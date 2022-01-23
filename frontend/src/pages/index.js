import React from 'react'
import { Route, Routes } from "react-router";
import { CodeAnalyzer } from './CodeAnalyzer';
import { IdeaGenerator } from './IdeaGenerator';
import { Home } from './Home';
import { BugAnalyzer } from './BugAnalyzer'
import { NameGenerator } from "./NameGenerator";
import { Reminder } from "./Reminder";
import Egg from "./Egg";
import {ChatBot} from "./ChatBot";


const Router = () => {
    return (
        <Routes>
            <Route path="/idea-generator" element={<IdeaGenerator />} />
            <Route path="/code-analyzer" element={<CodeAnalyzer />} />
            <Route path="/bug-analyzer" element={<BugAnalyzer />} />
            <Route path="/name-generator" element={<NameGenerator />} />
            <Route path="/egg" element={<Egg/>}/>
            <Route path="/chat-bot" element={<ChatBot/>}/>
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/" exact element={<Home />} />
        </Routes>
    )
}

export default Router