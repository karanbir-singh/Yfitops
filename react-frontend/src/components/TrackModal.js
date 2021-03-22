import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { AppContext } from "../index.js";
const user = require('../user.js');

export function TrackModal(props) {
    //> State and Context
    const [playlist, setPlaylist] = useState(props.user_playlist[0].map((track) => { return { ...track, checked: false } }));
    const { state, dispatch } = useContext(AppContext);

    //> Delete tracks
    async function deleteTracks() {
        // Tracks that have to be maintain
        let updatedList = playlist.filter(track => { return track.checked === false });

        // Tracks that have to be delete
        let tracksToDelete = playlist.filter(track => { return track.checked === true });

        // 1. Update the displayed tracks
        props.user_playlist[1](updatedList);

        // 2. Delete on storage
        tracksToDelete.forEach(track => {
            user.deleteFile(state.user.email, track.title);
        })
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Choose the tracks you want to delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        playlist.map((track, index) => {
                            return (
                                <InputGroup key={index} className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input"
                                            onChange={() => { playlist[index].checked = true }}
                                        />
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Text input with checkbox" placeholder={track.title} disabled />
                                </InputGroup>
                            );
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => deleteTracks()}>Delete</Button>
                    <Button onClick={() => {
                        setPlaylist(playlist.map((track) => {
                            return { ...track, checked: false }
                        }))
                        dispatch({ type: "modal displayed", payload: false })
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}