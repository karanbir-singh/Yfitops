import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import logo from "../assets/logo.png";
import { Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { AppContext } from "../index.js";

export function Navbs(props) {
    const [searched, setSearched] = useState(null);
    const { state, dispatch } = useContext(AppContext);

    function findTracks() {
        let foundTracks = props.user_playlist.filter((track) => {
            if ((track.title.toUpperCase()).includes(searched.toUpperCase())) {
                return track;
            }
        });
        if (foundTracks.length === 0 || foundTracks.length === props.user_playlist.length) {
            dispatch({ type: "search tracks", payload: null });
            return;
        }
        dispatch({ type: "search tracks", payload: foundTracks });
    }

    useEffect(() => {
        if (searched !== null)
            findTracks();
    }, [searched])

    return (
        <>
            <Navbar bg="light" expand="lg" className="navbs" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2 }}>
                <Navbar.Brand href="../../public/index.html"><img src={logo} width="30px" height="30px"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline >
                            <FormControl type="text" placeholder="Track name" className="mr-sm-2" onChange={() => setSearched(event.target.value)} />
                            <p style={{ marginLeft: '10px', marginBottom: '0px' }} >Copyright © 2021 Singh Karanbir. All rights riserved.</p>
                        </Form>
                    </Nav>
                    <Nav.Link href="../../public/auth.html" onClick={() => console.log("PROVA")}>Sign out</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}