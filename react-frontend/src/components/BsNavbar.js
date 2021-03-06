import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";

export function BsNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="../../public/index.html"><img src={assets.logo} width="30px" height="30px"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="../../public/index.html">Home</Nav.Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Nav>
                <Nav.Link href="../../public/auth.html">Accedi</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}