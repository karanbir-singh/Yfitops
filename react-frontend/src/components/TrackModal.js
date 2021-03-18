import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
const user = require('../user.js');

export function TrackModal(props) {
    const [playlist, setPlaylist] = useState(
        props.user_playlist[0].map((track) => {
            return { ...track, checked: false }
        })
    );

    async function deleteTracks() {
        let updatedList = playlist.filter(track => { return track.checked === false });
        let tracksToDelete = playlist.filter(track => { return track.checked === true });

        props.user_playlist[1](updatedList);

        // Second: delete stored files
        tracksToDelete.forEach(track => {
            user.deleteFile('user1', track.title);
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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Choose the tracks you want to delete
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {playlist.map((track, index) => {
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
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => deleteTracks()}>Delete</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}