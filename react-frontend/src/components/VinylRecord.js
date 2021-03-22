import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import vinyls from "../assets/vinyls/*.png";
import { AppContext } from "../index.js";

export function VinylRecord() {
    //> Vinyl types
    const types = Object.keys(vinyls);

    //> State and Context
    const [vinyl, setVinyl] = useState({ img: vinyls[types[Math.floor(Math.random() * types.length)]] });
    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <img className="rotating-vinyl" src={vinyl.img}
                style={{
                    animationPlayState: state.playback ? 'running' : 'paused',
                }}
            />
        </>
    );
}