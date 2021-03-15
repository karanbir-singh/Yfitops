import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { Navbs } from "./Navbs";
import { Track } from "./Track";
import { Col, Row, Spinner } from "react-bootstrap";
import { Player } from "./Player";
import { VinylRecord } from "./VinylRecord";
import { AppContext } from "../index.js";
import { ReactSidenav } from "./ReactSideNav";
import { TrackModal } from "./TrackModal";
const user = require('../user.js');

export function Home() {
    const [playlist, setPlaylist] = useLocalStorage('user-playlist');
    const { state, dispatch } = useContext(AppContext);

    //Get user playlist
    async function getUserPlaylist(userName) {
        if (playlist === null) {
            setPlaylist(await user.getPlaylist(userName));
        }
    }

    //Create card for each track
    function getCardslist(playlist) {
        let cardsList = playlist.map((music, index) => {
            return (
                <Track key={index} trackIndex={index} title={music.title} src={music.src} />
            )
        });
        return cardsList;
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

    useEffect(() => {
        getUserPlaylist('user1');
    }, [])

    return (
        <>
            <Navbs />
            <Row>
                <Col xs={state.isSideNavExpanded ? 2 : 1}><ReactSidenav /></Col>
                <Col >
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} style={{ paddingBottom: '120px', paddingTop: '59px', paddingRight: '10px' }} >{playlist ? getCardslist(playlist) : null}</Row>
                </Col>
            </Row>
            <VinylRecord />
            <Player />
            <TrackModal show={state.isModalDisplayed} onHide={() => dispatch({ type: "modal displayed", payload: false })} />
        </>
    );
}
