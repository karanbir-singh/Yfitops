import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppContext } from "../index.js";
const user = require('../user.js');

//> Render audio player
export function Player() {

    const [playlist, setPlaylist] = useState([]);

    const { state, dispatch } = useContext(AppContext);

    //* Set User playlist
    async function setUserPlaylist(userName) {
        setPlaylist(await user.getPlaylist(userName));
    }

    //* Similar to componentDidMount
    useEffect(() => {
        setUserPlaylist('user1');
    }, [])

    // Formats the track title
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

    return (
        <>
            <AudioPlayer
                src={playlist[state.index]?.src}
                className="footer-player"
                showSkipControls={true}
                autoPlayAfterSrcChange={true}
                header={formatTitle(playlist[state.index]?.title)}
                layout="stacked"

                onPlay={() => dispatch({ type: "play", payload: true })}
                onPause={() => dispatch({ type: "pause", payload: false })}

                onClickPrevious={() => {
                    dispatch({ type: 'previous track', payload: state.index });
                }}
                onClickNext={() => {
                    dispatch({ type: 'next track', payload: state.index });
                }}

                onEnded={() => {
                    dispatch({ type: 'next track', payload: state.index });
                }}

                style={{ paddingLeft: '150px', paddingRight: '150px' }}
            />
        </>
    );
};