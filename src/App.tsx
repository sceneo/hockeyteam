import React from 'react';
import './App.css';
import Menu from "./ui/components/Menu";
import {GlobalStateProvider} from "./ui/globalstate/GlobalStateProvider";

function App() {
    return (
        <GlobalStateProvider>
            <Menu/>
        </GlobalStateProvider>
    );
}

export default App;
