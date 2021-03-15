import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";    
import logo from "../assets/logo.png";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";

export function Navbs() {
    return (
        <>
            <Navbar bg="light" expand="lg" className="navbs" style={{position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2}}>
                <Navbar.Brand href="../../public/index.html"><img src={logo} width="30px" height="30px"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Nav>
                    <Nav.Link href="../../public/auth.html" onClick={() => console.log("PROVA")}>Accedi</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}