import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import { BsNavbar } from "./components/BsNavbar";
import { Track } from "./components/Track";
import { Row } from "react-bootstrap";

// App's root element
const rootElement = document.getElementById("root");

function App() {
    return (
        <>
            <BsNavbar />
            <Row xs={1} sm={2} md={3} lg={3} xl={6} >
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />

                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
                <Track />
            </Row>
        </>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
