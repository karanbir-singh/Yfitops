import React, { useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button } from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export function Player() {
    return (
        <AudioPlayer src="https://firebasestorage.googleapis.com/v0/b/yfitops-cabf7.appspot.com/o/user1%2FFabri%20Fibra%20e%20la%20pula%20busso.mp3?alt=media&token=ff3fa8df-23cc-47f3-8eba-3afe17d9b857"
        className="footer-player" onPlay={e => console.log("onPlay")} showSkipControls={true}/>
    );
};