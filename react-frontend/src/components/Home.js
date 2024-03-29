import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { Navbs } from "./Navbs";
import { Track } from "./Track";
import { Col, Row } from "react-bootstrap";
import { Player } from "./Player";
import { VinylRecord } from "./VinylRecord";
import { AppContext } from "../index.js";
import { ReactSidenav } from "./ReactSideNav";
import { TrackModal } from "./TrackModal";
const user = require('../user.js');

export function Home() {
    //> State and Context
    const [playlist, setPlaylist] = useLocalStorage('user-playlist', []);
    const { state, dispatch } = useContext(AppContext);

    //> Formats the track title
    function formatTitle(title) {
        if (title === undefined) {
            return;
        }
        return title.split('.').slice(0, -1).join('.');
    }

    //> Get user playlist
    async function getUserPlaylist(userName) {
        // Check if localStorage is empty
        if (playlist.length === 0) { // If localStorage is empty...
            // Get user file names
            let titles = await user.getFileNames(userName);

            // Fill localStorage and display tracks
            let newList = [];
            for (const title of titles) {
                newList = [...newList, { title: title, src: await user.getFileURL(userName, title), trackIndex: newList.length }];
                setPlaylist(newList);
            }
        }
    }

    //> Create card for each track
    function getCardslist(playlist) {
        // List of tracks
        let cardsList = playlist.map((track, index) => {
            return (
                <Track key={index} trackIndex={track.trackIndex} title={formatTitle(track.title)} src={track.src} fileName={track.title} />
            )
        });
        return cardsList;
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

    //> ...componentDidMount and componentDidUpdate
    useEffect(() => {
        getUserPlaylist(state.user.email);
    }, [])

    return (
        <>
            <Navbs user_playlist={playlist} />
            <Row>
                <Col xs={state.isSideNavExpanded ? 2 : 1}><ReactSidenav user_playlist={[playlist, setPlaylist]} /></Col>
                <Col>
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="tracks">
                        {state.searchedTracks === null ? getCardslist(playlist) : getCardslist(state.searchedTracks)}
                    </Row>
                </Col>
            </Row>
            <VinylRecord />
            <Player key={playlist.length} user_playlist={playlist} />
            <TrackModal key={playlist.length + 1} show={state.isModalDisplayed} user_playlist={[playlist, setPlaylist]} />
        </>
    );
}
