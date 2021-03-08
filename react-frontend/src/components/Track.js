import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import cards from "../assets/cards/*.png";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AppContext } from "../index.js";

export function Track(props) {
    const [localState, setState] = useState({
        img: cards.track_green
    });

    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <Col>
                <Card style={{ maxWidth: '22.8rem', marginTop: '10px', marginLeft: '5px' }}>
                    <Card.Img variant="top" src={localState.img} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Row className="align-items-center">
                            <Col style={{ textAlign: 'center' }}>
                                <Button variant="outline-dark" style={{ width: '50px', height: '50px', borderRadius: "100%" }}>
                                    <i className="material-icons">play_arrow</i>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}