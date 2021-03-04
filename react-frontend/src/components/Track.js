import React, { useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button, Card, Col, Row } from "react-bootstrap";


export function Track(props) {
    const [state, setState] = useState({
        img: assets.track_default
    });

    return (
        <Col>
            <Card style={{ maxWidth: '15rem', marginTop: '10px', marginLeft: '5px' }}>
                <Card.Img variant="top" src={state.img} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Row style={{ marginBottom: "-10px", marginLeft: "15px" }}>
                        <Col style={{ marginRight: "-40px", marginTop: "11px" }}>
                            <button id="skip-previous" style={{ border: "0px", backgroundColor: "white" }}>
                                <i className="material-icons">skip_previous</i>
                            </button>
                        </Col>

                        <Col style={{ marginRight: "-27px" }}>
                            <Button variant="outline-dark" style={{ width: '50px', height: '50px', borderRadius: "100%" }}>
                                <i className="material-icons">play_arrow</i>
                            </Button>
                        </Col>

                        <Col style={{ marginTop: "11px" }}>
                            <button id="skip-next" style={{ border: "0px", backgroundColor: "white" }}>
                                <i className="material-icons">skip_next</i>
                            </button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}