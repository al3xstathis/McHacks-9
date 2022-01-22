import React from 'react'
import './styles.scss'
import Router from "./pages";
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <Router />
        </>
    );
}

export default App;
