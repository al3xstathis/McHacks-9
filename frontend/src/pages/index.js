import React from 'react'
import { Route, Routes } from "react-router";
import { CodeAnalyzer } from './CodeAnalyzer';
import { IdeaGenerator } from './IdeaGenerator';
import { Home } from './Home';
import NameGenerator from "./NameGenerator";


const Router = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/idea-generator" element={<IdeaGenerator />} />
            <Route path="/name-generator" element={<NameGenerator/>} />
            <Route path="/code-analyzer" element={<CodeAnalyzer />} />
        </Routes>
    )
}

export default Router