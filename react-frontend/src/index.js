import React, { createContext, useReducer, useState } from "react";
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
    switch (action.type) {
        case "play":
            newState.playback = action.payload;
            break;

        case "pause":
            newState.playback = action.payload;
            break;

        case "choose track":
            newState.index = action.payload;
            break;

        case "previous track":
            newState.index = action.payload - 1;
            break;

        case "next track":
            newState.index = action.payload + 1;
            break;

        case "side-nav expanded":
            newState.isSideNavExpanded = action.payload;
            break;

        case "modal displayed":
            newState.isModalDisplayed = action.payload;
            break;
    }
    return newState;
}

function App() {
    const [state, dispatch] = useReducer(appReducer, {
        playback: false,
        index: -1,
        isSideNavExpanded: false,
        isModalDisplayed: false
    });

    // Hook
    function useLocalStorage(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            try {
                // Get from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or if none return initialValue
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                // If error also return initialValue
                console.log(error);
                return initialValue;
            }
        });

        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = value => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.log(error);
            }
        };

        return [storedValue, setValue];
    }

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
