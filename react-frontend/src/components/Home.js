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
const user = require('../user.js');

export function Home() {
    const [playlist, setPlaylist] = useState([]);

    const { state, dispatch } = useContext(AppContext);

    async function getMusicCards(userName) {
        let playlist = await user.getPlaylist(userName);
        let cardsList = playlist.map((music, index) => {
            return (
                <Track key={index} trackIndex={index} title={music.title.split('.mp3')[0]} src={music.src} />
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
            {/* <Row>
                <Col xs={2}></Col>
                <Col > */}
            <Row xs={1} sm={2} md={3} lg={4} xl={5} style={{ paddingBottom: '120px' }} >{playlist}</Row>
            {/* </Col>
            </Row> */}
            <VinylRecord />
            <Player />
        </>
    );
}
