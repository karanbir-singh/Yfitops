import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppContext } from "../index.js";

export function Player(props) {
    //> State and Context
    const [playlist, setPlaylist] = useState(props.user_playlist);
    const { state, dispatch } = useContext(AppContext);

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

    return (
        <>
            <AudioPlayer
                header={formatTitle(playlist[state.index]?.title)}
                src={playlist[state.index]?.src}
                className="footer-player"

                showSkipControls={true}
                autoPlayAfterSrcChange={true}
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