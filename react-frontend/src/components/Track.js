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

    return (
        <>
            <Col>
                <Card style={{ maxWidth: '22.8rem', marginTop: '10px', marginLeft: '5px' }}>
                    <Card.Img variant="top" src={localState.img} />
                    <Card.Body>
                        <Card.Title>{formatTitle(props.title)}</Card.Title>
                        <Row className="align-items-center">
                            <Col style={{ textAlign: 'center' }}>
                                <Button className="card-button" variant="outline-dark" onClick={() => dispatch({ type: 'choose track', payload: props.trackIndex })}
                                    style={{ width: '50px', height: '50px', borderRadius: "100%" }}>
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