import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { AppContext } from "../index.js";
import { Spinner } from "react-bootstrap";
const user = require('../user.js');

export function ReactSidenav(props) {
    //> States and Context
    const { state, dispatch } = useContext(AppContext);
    const [recentPlayed, setRecentPlayed] = useLocalStorage('recent-played',[]);
    const [isUploading, setIsUploading] = useState(false);

    //> Formats the track title
    function formatTitle(title) {
        if (title === undefined) {
            return;
        }
        if (title.includes('.mp3')) {
            return title.split('.mp3')[0];
        }
        if (title.includes('.m4a')) {
            return title.split('.m4a')[0];
        }
        if (title.includes('.flac')) {
            return title.split('.flac')[0];
        }
    }

    //> Add new tracks
    async function addTracks(userName, files) {
        // Activate spinner
        setIsUploading(true);

        // At first, "updatedList" contains old tracks
        let updatedList = [...props.user_playlist[0]];
        for (const file of files) {
            // Check if the file is uploaded...
            if (await user.addFile(userName, file)) {
                // if so, update "updatedList"
                updatedList = [...updatedList, { title: file.name, src: await user.getFileURL(userName, file.name), trackIndex: updatedList.length }];
                props.user_playlist[1](updatedList);
            }
        }

        // Stop spinner
        setIsUploading(false);
    }

    //> Check if "recentPlayed" already contains the track 
    function checkDuplicates(value) {
        return (recentPlayed.map((track) => {
            if (track.trackIndex === value.trackIndex) return true;
        })).includes(true);
    }

    //> Hook
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

    //> On "state.index" changed...
    useEffect(() => {
        // Get played track
        let playedTrack = { ...props.user_playlist[0][state.index] };

        // Check if "recentPlayed" exceeded 7 as max size 
        // or "state.index" is -1
        // or "recentPlayed" already contains "playedTrack" 
        if (state.index !== -1 && !checkDuplicates(playedTrack)) {
            if(recentPlayed.length === 16){
                recentPlayed.pop()
            }

            // If not, update "recentPlayed"
            let updatedRecentPlayed = [playedTrack, ...recentPlayed];
            setRecentPlayed(updatedRecentPlayed);
        }
    }, [state.index])

    return (
        <>
            <SideNav
                className="side-nav"

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
                        {
                            recentPlayed.map((track, index) => {
                                return (
                                    <NavItem key={index} eventKey={"recent played/" + track?.title}
                                        onClick={() => { dispatch({ type: 'choose track', payload: track.trackIndex }) }}
                                    >
                                        <NavText>
                                            {formatTitle(track?.title)}
                                        </NavText>
                                    </NavItem>
                                );
                            })
                        }
                    </NavItem>

                    <NavItem eventKey="upload">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em', display: isUploading ? 'none' : '' }} >add</i>
                            <Spinner animation="border" variant="light" size="sm" style={{ display: isUploading ? '' : 'none' }} />
                        </NavIcon>
                        <NavText>
                            Upload track
                            <input type="file" id="track-upload"
                                style={{ visibility: 'hidden' }}
                                multiple
                                onChange={(event) => addTracks(state.user.email, event.target.files)}></input>
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