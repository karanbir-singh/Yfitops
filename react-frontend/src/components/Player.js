import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const user = require('../user.js');

//> Render audio player
export function Player() {
    // Current music index
    const [currMusic, setCurrMusic] = useState({
        index: -1
    })

    // User playlist
    const [playlist, setPlaylist] = useState([])

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
                src={playlist[currMusic.index]?.src}
                className="footer-player"
                showSkipControls={true}
                autoPlayAfterSrcChange={true}
                header={playlist[currMusic.index]?.title}
                layout="stacked"

                onEnded={() => setCurrMusic({ index: currMusic.index + 1 })}

                onClickPrevious={() => { setCurrMusic({ index: currMusic.index - 1 }) }}
                onClickNext={() => { setCurrMusic({ index: currMusic.index + 1 }) }}
            />

        </>
    );
};