import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import { Navbs } from "./components/Navbs";
import { Track } from "./components/Track";
import { Col, Row, Spinner } from "react-bootstrap";
import { Player } from "./components/Player";
import 'regenerator-runtime/runtime';
import { VinylRecord } from "./components/VinylRecord";
const user = require('./user.js');

// App's root element
const rootElement = document.getElementById("root");

// App's context
const appContext = createContext(null);

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
            <Row style={{ paddingBottom: '100px' }} >
                <Col xs={2}></Col>
                <Col >
                    <Row xs={1} sm={2} md={3} lg={4} xl={5}  style={{ paddingBottom: '100px' }} >{playlist}</Row>
                </Col>
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
