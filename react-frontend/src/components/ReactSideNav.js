import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { AppContext } from "../index.js";
const user = require('../user.js');

export function ReactSidenav(props) {
    const { state, dispatch } = useContext(AppContext);
    const [recentPlayed, setRecentPlayed] = useState([]);

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

    async function addTrack(userName, file) {
        let newTrack = { title: file.name, src: await user.addFile(userName, file) };
        let updatedPlaylist = [...props.user_playlist[0], newTrack];
        props.user_playlist[1](updatedPlaylist);
    }

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
                        {/* {recentPlayed.map((track) => {
                            return (
                                <NavItem eventKey={"recent played/" + track?.title}>
                                    <NavText>
                                        {track?.title}
                                    </NavText>
                                </NavItem>
                            );
                        })} */}
                    </NavItem>

                    <NavItem eventKey="upload">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >add</i>
                        </NavIcon>
                        <NavText>
                            Upload track
                            <input type="file" id="track-upload"
                                style={{ visibility: 'hidden' }}
                                onChange={(event) => addTrack('user1', event.target.files[0])}></input>
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