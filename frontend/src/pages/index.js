import React from 'react'
import {Route, Routes} from "react-router";
import NameGenerator from "./NameGenerator";


const Router = () => {
    return (
        <Routes>
            <Route path="/" exact/>
            <Route path="/name-generator" element={<NameGenerator/>}/>
            <Route path="/code-analyzer"/>
        </Routes>
    )
}

export default Router