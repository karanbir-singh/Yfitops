import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import vinyls from "../assets/vinyls/*.png";
import { Image } from "react-bootstrap";
import { AppContext } from "../index.js";

export function VinylRecord() {
    const types = Object.keys(vinyls);

    const [localState, setState] = useState({
        img: vinyls[types[Math.floor(Math.random() * types.length)]]
    })

    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <img src={localState.img}
                style={{
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    marginBottom: '10px',
                    animation: 'rotation 5s infinite linear',
                    zIndex: 2,
                    marginLeft: '10px',
                    animationPlayState: state.playback ? 'running' : 'paused'
                }}
            />
        </>
    );
}