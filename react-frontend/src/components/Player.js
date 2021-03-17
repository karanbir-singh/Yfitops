import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppContext } from "../index.js";

//> Render audio player
export function Player(props) {
    const [playlist, setPlaylist] = useState(props.user_playlist);
    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <AudioPlayer
                header={playlist[state.index]?.title}
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