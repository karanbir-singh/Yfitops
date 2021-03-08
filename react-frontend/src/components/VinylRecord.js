import React, { useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import vinyls from "../assets/vinyls/*.png";
import { Image } from "react-bootstrap";

export function VinylRecord() {
    const types = ['blue','green','lightblue','orange','purple','red'];

    const [state, setState] = useState({
        img: vinyls[types[Math.floor(Math.random() * types.length)]],
        playback: false
    })

    return (
        <>
            <Image src={state.img} thumbnail />
        </>
    );
}