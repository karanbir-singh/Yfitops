import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import cards from "../assets/cards/*.png";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AppContext } from "../index.js";

export function Track(props) {
    //> Context
    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <Col className="col-track">
                <Card className="card-track">
                    <Card.Img variant="top" src={cards.track_green} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Row className="align-items-center">
                            <Col className="card-body-track">
                                <Button className="card-button" variant="outline-dark"
                                    onClick={() => { dispatch({ type: 'choose track', payload: props.trackIndex }) }}
                                >
                                    {state.index === props.trackIndex ? <i className="material-icons">pause</i> : <i className="material-icons">play_arrow</i>}
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}