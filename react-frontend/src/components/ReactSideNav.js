import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { AppContext } from "../index.js";
import { Col, Container, Row, Spinner } from "react-bootstrap";
const user = require('../user.js');

export function ReactSidenav(props) {
    const { state, dispatch } = useContext(AppContext);
    const [recentPlayed, setRecentPlayed] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Formats the track title
    function formatTitle(title) {
        if (title === undefined) {
            return;
        }
        if (title.includes('.mp3')) {
            return title.split('.mp3')[0];
        }
        if (title.includes('.m4a')) {
            return title.split('.m4a')[0];
        }
        if (title.includes('.flac')) {
            return title.split('.flac')[0];
        }
    }

    async function addTracks(userName, files) {
        setIsUploading(true);

        let updatedList = [...props.user_playlist[0]];
        for (const file of files) {
            updatedList.push({ title: file.name, src: await user.addFile(userName, file) });
        }

        props.user_playlist[1](updatedList);
        setIsUploading(false);
    }

    // Check if recentPlayed already contains the track 
    function checkDuplicates(value) {
        return (recentPlayed.map((track) => {
            if (track.trackIndex === value.trackIndex) return true;
        })).includes(true);
    }

    useEffect(() => {
        let playedTrack = { ...props.user_playlist[0][state.index], trackIndex: state.index };

        if (state.index !== -1 && recentPlayed.length < 8 && !checkDuplicates(playedTrack)) {
            let updatedRecentPlayed = [playedTrack, ...recentPlayed];
            setRecentPlayed(updatedRecentPlayed);
        }
    }, [state.index])

    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    switch (selected) {
                        case "delete":
                            dispatch({ type: "modal displayed", payload: true });
                            break;

                        case "upload":
                            document.getElementById('track-upload').click();
                            break;
                    }
                }}

                onToggle={(expanded) => {
                    dispatch({ type: 'side-nav expanded', payload: expanded });
                }}

                style={{ backgroundColor: '#343a40', zIndex: 1, position: 'fixed', top: '59px', left: 0 }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="recent played">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >slow_motion_video</i>
                        </NavIcon>
                        <NavText>
                            Recent played
                        </NavText>
                        {recentPlayed.map((track, index) => {
                            return (
                                <NavItem key={index} eventKey={"recent played/" + track?.title} onClick={() => { dispatch({ type: 'choose track', payload: track.trackIndex }) }}>
                                    <NavText>
                                        {formatTitle(track?.title)}
                                    </NavText>
                                </NavItem>
                            );
                        })}
                    </NavItem>

                    <NavItem eventKey="upload">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em', display: isUploading ? 'none' : '' }} >add</i>
                            <Spinner animation="border" variant="light" size="sm" style={{ display: isUploading ? '' : 'none' }} />
                        </NavIcon>
                        <NavText>
                            Upload track
                            <input type="file" id="track-upload"
                                style={{ visibility: 'hidden' }}
                                multiple
                                onChange={(event) => addTracks('user1', event.target.files)}></input>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="delete">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >delete</i>
                        </NavIcon>
                        <NavText>
                            Delete track
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    );
}