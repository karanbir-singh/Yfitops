import React, { createContext, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import 'regenerator-runtime/runtime';
import { Home } from "./components/Home.js";

// App's root element
const rootElement = document.getElementById("root");

// App's context
export const AppContext = createContext(null);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

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

function App() {
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

    function displayAuthOptions() {
        ui.start('#auth', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            // Other config options..
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    dispatch(
                        {
                            type: "login",
                            payload: { userName: authResult.user.displayName, userEmail: authResult.user.email, userImage: authResult.user.photoURL }
                        });
                    return false;
                },
            },
        });
    }

    useEffect(() => {
        if (window.localStorage.getItem('firebaseui::rememberedAccounts') === null) {
            displayAuthOptions();
            return;
        }

        let name = JSON.parse(window.localStorage.getItem('firebaseui::rememberedAccounts'))[0]?.displayName;
        let email = JSON.parse(window.localStorage.getItem('firebaseui::rememberedAccounts'))[0]?.email;
        let img = JSON.parse(window.localStorage.getItem('firebaseui::rememberedAccounts'))[0]?.photoUrl;
        dispatch({ type: "login", payload: { userName: name, userEmail: email, userImage: img } });
    }, [state.user.email])

    return (
        <>
            <AppContext.Provider value={{ state, dispatch }}>
                {state.user.email === null && <div id="auth"></div>}
                {state.user.email !== null && <Home />}
            </AppContext.Provider>
        </>
    );
}

ReactDOM.render(
    <App />,
    rootElement
);
