import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import 'regenerator-runtime/runtime';
import { Home } from "./components/Home.js";

// App's root element
const rootElement = document.getElementById("root");

// App's context
export const AppContext = createContext(null);

function appReducer(state, action) {
    let newState = { ...state };
    console.log(newState);
    switch (action.type) {
        case "play":
            newState.playback = action.payload;
            break;

        case "pause":
            newState.playback = action.payload;
            break;
    }
    return newState;
}

function App() {
    const [state, dispatch] = useReducer(appReducer, {
        playback: false
    });

    return (
        <>
            <AppContext.Provider value={{ state, dispatch }}>
                <Home />
            </AppContext.Provider>
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
