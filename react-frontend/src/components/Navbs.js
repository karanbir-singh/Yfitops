import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import logo from "../assets/logo.png";
import { Form, FormControl, Image, Nav, Navbar } from "react-bootstrap";
import { AppContext } from "../index.js";

export function Navbs(props) {
    const [searched, setSearched] = useState(null);
    const { state, dispatch } = useContext(AppContext);

    //> Search tracks
    function findTracks() {
        // Check if there are matches
        let foundTracks = props.user_playlist.filter((track) => {
            if ((track.title.toUpperCase()).includes(searched.toUpperCase())) {
                return track;
            }
        });

        // If there are no matches, do nothing 
        if (foundTracks.length === 0 || foundTracks.length === props.user_playlist.length) {
            dispatch({ type: "search tracks", payload: null });
            return;
        }

        // instead, if there are matches, show found tracks
        dispatch({ type: "search tracks", payload: foundTracks });
    }

    //> On "searched" changed...
    useEffect(() => {
        // Check if the user searched something
        if (searched !== null) // If so...
            // then start searching
            findTracks();
    }, [searched])

    return (
        <>
            <Navbar bg="light" expand="lg" className="navbs">
                <Navbar.Brand href="../../public/index.html"><img src={logo} width="30px" height="30px"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline>
                            <FormControl type="text" placeholder="Track name" className="mr-sm-2" onChange={() => setSearched(event.target.value)} />
                            <p className="copyright">Copyright © 2021 Singh Karanbir. All rights riserved.</p>
                        </Form>
                    </Nav>
                    {
                        state.user.image ?
                            <Image className="user-photo" src={state.user.image} roundedCircle /> :
                            <i className="material-icons user-photo">account_circle</i>
                    }
                    <p className="user-name">{state.user.name}</p>
                    <Nav.Link onClick={() => { dispatch({ type: "logout", payload: null }) }}>Sign out</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}