import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";

export function BsNavbar() {
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="../../public/index.html"><img src={assets.logo} width="30px" height="30px"></img></Navbar.Brand>
            <Nav className="mr-auto" style={{ padding: "0px" }}>
                <Nav.Link href="../../public/index.html">Home</Nav.Link>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Nav>
            <Nav.Link href="../../public/index.html">Accedi</Nav.Link>
        </Navbar>
    );
}