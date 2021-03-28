import React, { useContext } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import cards from "../assets/cards/*.png";
import { Button, Card, Col, Row } from "react-bootstrap";
import { AppContext } from "../index.js";

export function Track(props) {
    //> Context
    const { state, dispatch } = useContext(AppContext);

    function downloadTrack(fileName, url) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const a = document.createElement('a');
            a.id = "a"
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
        };
        xhr.open('GET', url);
        xhr.send();
    }

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
                    <Card.Footer><i className="material-icons track-download" onClick={() => downloadTrack(props.fileName, props.src)}>download</i></Card.Footer>
                </Card>
            </Col>
        </>
    );
}
