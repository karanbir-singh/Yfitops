import React, { useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button } from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
const storageRef = storage.ref();

async function getAudios(user) {
    // let data = await storageRef.child(user).getDownloadUrl();
    storageRef.child(user + "/02. White America - (www.SongsLover.com).mp3").getDownloadURL()
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            // var xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = (event) => {
            //     var blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();
            console.log(url);
        })
        .catch((error) => {
            // Handle any errors
        });
    // await console.log(data);
    // return await data;
}

const playlist = [
    {},
    {}
]

export function Player() {
    const [state, setState] = useState({
        currentMusicIndex: 0,
        currentMusicTitle: "Now playing: Let it go!"
    })

    return (
        <AudioPlayer
            src="https://firebasestorage.googleapis.com/v0/b/yfitops-cabf7.appspot.com/o/user1%2F02.%20White%20America%20-%20(www.SongsLover.com).mp3?alt=media&token=89613d5d-3186-4f8f-bb9a-048d73d944ce"
            className="footer-player"
            showSkipControls={true}
            header={state.currentMusicTitle}
            layout="stacked"
            onPlay={() => console.log(getAudios('user1'))}
        />
    );
};