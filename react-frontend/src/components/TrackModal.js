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
        let checkedTracksIndexes = playlist.map((track, index) => track.checked ? index : null).filter(i => i !== null);
        let deleteTracks = [];

        // First: update localStorage
        checkedTracksIndexes.forEach(index => {
            deleteTracks.push(playlist.splice(index, 1)[0].title);
        });
        props.user_playlist[1](playlist);

        // Second: delete stored files
        deleteTracks.forEach(title => {
            user.deleteFile('user1', title);
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
                                        onChange={() => playlist[index].checked = true}
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