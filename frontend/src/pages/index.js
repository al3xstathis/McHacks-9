import React from 'react'
import { Route, Routes } from "react-router";
import { IdeaGenerator } from './IdeaGenerator';


const Router = () => {
    return (
        <Routes>
            <Route path="/" exact />
            <Route path="/idea-generator" element={<IdeaGenerator />} />
            <Route path="/name-generator" />
            <Route path="/code-analyzer" />
        </Routes>
    )
}

export default Router