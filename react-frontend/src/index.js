import React, { createContext, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import 'regenerator-runtime/runtime';
import { Home } from "./components/Home.js";
import { Login } from "./components/Login";

//* App root element
const rootElement = document.getElementById("root");

//* App context
export const AppContext = createContext(null);

//* App reducer
function appReducer(state, action) {
    let newState = { ...state };
    switch (action.type) {
        case "login":
            newState.user.name = action.payload.userName;
            newState.user.email = action.payload.userEmail;
            newState.user.image = action.payload.userImage;
            break;

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

        case "search tracks":
            newState.searchedTracks = action.payload;
            break;

        case "logout":
            newState.user.email = action.payload;
            window.localStorage.clear();
            break;
    }
    return newState;
}

//* App
function App() {
    //> Reducer
    const [state, dispatch] = useReducer(appReducer, {
        user: {
            name: null,
            email: null,
            image: null
        },
        playback: false,
        index: -1,
        isSideNavExpanded: false,
        isModalDisplayed: false,
        searchedTracks: null
    });

    return (
        <>
            <AppContext.Provider value={{ state, dispatch }}>
                {state.user.email ? <Home /> : <Login />}
            </AppContext.Provider>
        </>
    );
}

//* Rendering
ReactDOM.render(
    <App />,
    rootElement
);
