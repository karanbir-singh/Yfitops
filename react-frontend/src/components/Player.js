import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button } from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//> Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

//> Create a storage reference from our storage service
const storageRef = storage.ref();

//> Render audio player
export function Player() {

    //Current
    const [currMusic, setCurrMusic] = useState({
        index: -1
    })

    const [playlist, setPlaylist] = useState([])

    //* Get single online file download/play URL
    async function getFileURL(user, fileName) {
        return await storageRef.child(user + "/" + fileName).getDownloadURL();
    }

    //* Get user uploaded file names
    async function getUserFileNames(user) {
        return (await storageRef.child(user).listAll())._delegate.items.map(item => { return item._location.path_.split('/')[1] });
    }

    //* Get User playlist
    async function getUserPlaylist(user) {
        let titles = await getUserFileNames(user);

        let list = [];
        for (const title of titles) {
            list.push({ title: title, src: await getFileURL(user, title) });
        }
        setPlaylist(list);
    }

    //* Similar to componentDidMount
    useEffect(() => {
        getUserPlaylist('user1');
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
                onClickPrevious={() => setCurrMusic({ index: currMusic.index - 1 })}
                onClickNext={() => setCurrMusic({ index: currMusic.index + 1 })}
            />

        </>
    );
};