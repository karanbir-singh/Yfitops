import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppContext } from "../index.js";

//> Render audio player
export function Player() {
    const [playlist, setPlaylist] = useLocalStorage('user-playlist');
    const { state, dispatch } = useContext(AppContext);

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
        <>  {}
            <AudioPlayer
                src={playlist[state.index]?.src}
                className="footer-player"
                showSkipControls={true}
                autoPlayAfterSrcChange={true}
                header={playlist[state.index]?.title}
                layout="stacked"

                onPlay={() => dispatch({ type: "play", payload: true })}
                onPause={() => dispatch({ type: "pause", payload: false })}

                onClickPrevious={() => {
                    (state.index > 0) ? dispatch({ type: 'previous track', payload: state.index }) : null;
                }}
                onClickNext={() => {
                    (state.index < playlist.length - 1) ? dispatch({ type: 'next track', payload: state.index }) : null;
                }}

                onEnded={() => {
                    (state.index < playlist.length - 1) ? dispatch({ type: 'next track', payload: state.index }) : null;
                }}

                style={{ paddingLeft: '150px', paddingRight: '150px', zIndex: 1 }}
            />
        </>
    );
};