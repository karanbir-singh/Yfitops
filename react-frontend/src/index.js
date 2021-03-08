import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import { Navbs } from "./components/Navbs";
import { Track } from "./components/Track";
import { Row, Spinner } from "react-bootstrap";
import { Player } from "./components/Player";
import 'regenerator-runtime/runtime';
const user = require('./user.js');

// App's root element
const rootElement = document.getElementById("root");

// src: "https://firebasestorage.googleapis.com/v0/b/yfitops-cabf7.appspot.com/o/user1%2F02.%20White%20America%20-%20(www.SongsLover.com).mp3?alt=media&token=89613d5d-3186-4f8f-bb9a-048d73d944ce"
// title: "02. White America.mp3"

function App() {

    const [playlist, setPlaylist] = useState([]);

    async function getMusicCards(userName) {
        let playlist = await user.getPlaylist(userName);
        let cardsList = playlist.map((music, index) => {
            return (
                <Track key={index} title={music.title.split('.mp3')[0]} src={music.src} />
            )
        })
        setPlaylist(cardsList);
    }

    useEffect(() => {
        getMusicCards('user1');
    }, [])

    return (
        <>
            <Navbs />

            <Row xs={1} sm={2} md={3} lg={3} xl={6} style={{ paddingBottom: '100px' }} >
                {playlist}
            </Row>
            <Player />
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
