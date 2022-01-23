import { useState, React } from 'react'
import './styles.scss'
import Router from "./pages";
import Navbar from './components/Navbar';

function App() {
    const [selectedTab, setSelectedTab] = useState("");

    const tabChange = (newTab) => {
        setSelectedTab(newTab);
    }
    return (
        <>
            <Navbar selectedTab={selectedTab} tabChange={tabChange} />
            <Router />
        </>
    );
}

export default App;
