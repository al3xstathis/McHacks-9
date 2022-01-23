import React from 'react'
import { Route, Routes } from "react-router";
import { CodeAnalyzer } from './CodeAnalyzer';
import { IdeaGenerator } from './IdeaGenerator';
import { Home } from './Home';
import { BugAnalyzer } from './BugAnalyzer'
import NameGenerator from "./NameGenerator";
import Reminder from "./Reminder";


const Router = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/idea-generator" element={<IdeaGenerator />} />
            <Route path="/code-analyzer" element={<CodeAnalyzer />} />
            <Route path="/bug-analyzer" element={<BugAnalyzer />} />
            <Route path="/name-generator" element={<NameGenerator />} />
            <Route path="/reminder" element={<Reminder />} />
        </Routes>
    )
}

export default Router