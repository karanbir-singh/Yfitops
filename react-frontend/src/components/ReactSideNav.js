import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { AppContext } from "../index.js";
const user = require('../user.js');

export function ReactSidenav() {

    const { state, dispatch } = useContext(AppContext);

    async function addFile(userName, file) {
        user.addFile(userName, file).then((url) => {console.log(url);});
    }


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
            <SideNav
                onSelect={(selected) => {
                    switch (selected) {
                        case "delete":
                            dispatch({ type: "modal displayed", payload: true });
                            break;

                        case "upload":
                            document.getElementById('track-upload').click();
                            break;
                    }
                }}

                onToggle={(expanded) => {
                    dispatch({ type: 'side-nav expanded', payload: expanded });
                }}

                style={{ backgroundColor: '#343a40', zIndex: 1, position: 'fixed', top: '59px', left: 0 }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="recent played">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >slow_motion_video</i>
                        </NavIcon>
                        <NavText>
                            Recent played
                        </NavText>

                        <NavItem eventKey="recent played/track1">
                            <NavText>
                                Upload track
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="recent played/track2">
                            <NavText>
                                Upload track
                            </NavText>
                        </NavItem>
                    </NavItem>

                    <NavItem eventKey="upload">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >add</i>
                        </NavIcon>
                        <NavText>
                            Upload track
                            <input type="file" id="track-upload"
                                style={{ visibility: 'hidden' }}
                                onChange={(event) => addFile('user1', event.target.files[0])}></input>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="delete">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >delete</i>
                        </NavIcon>
                        <NavText>
                            Delete track
                        </NavText>
                    </NavItem>

                </SideNav.Nav>
            </SideNav>
        </>
    );
}