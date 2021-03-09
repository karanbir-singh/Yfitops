import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { VinylRecord } from "./VinylRecord";
import { Col, Row } from "react-bootstrap";
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

    return (
        <>
            <AudioPlayer
                src={playlist[state.index]?.src}
                className="footer-player"
                showSkipControls={true}
                autoPlayAfterSrcChange={true}
                header={playlist[state.index]?.title.split('.mp3')[0]}
                layout="stacked"

                onPlay={() => dispatch({ type: "play", payload: true })}
                onPause={() => dispatch({ type: "pause", payload: false })}

                onClickPrevious={() => dispatch({ type: 'previous track', payload: state.index })}
                onClickNext={() => dispatch({ type: 'next track', payload: state.index })}

                onEnded={() => dispatch({ type: 'next track', payload: state.index })}

                style={{ paddingLeft: '150px', paddingRight: '150px' }}
            />
        </>
    );
};