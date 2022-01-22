import React from 'react'
import {Route, Routes} from "react-router";


const Router = () => {
    return (
        <Routes>
            <Route path="/" exact/>
            <Route path="/idea-generator"/>
            <Route path="/code-analyzer"/>
        </Routes>
    )
}

export default Router