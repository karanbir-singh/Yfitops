import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import assets from "../assets/*.png";
import { Button, Card, Col, Row } from "react-bootstrap";


export function Track() {
    return (
        <Col>
            <Card style={{ maxWidth: '15rem', marginTop: '10px', marginLeft: '15px' }}>
                <Card.Img variant="top" src={assets.track_default} />
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
        </Col >
    );
}

//Creates the card of an artist
// function getArtistCard(artist) {
//     if (artist.name === undefined || artist.image_url === undefined)
//         return null;
//     let artistCard = document.createElement("div");
//     artistCard.classNameName = "card";

//     let artistImg = document.createElement("img");
//     artistImg.src = artist.image_url;
//     artistImg.classNameName = "card-img-top";
//     artistCard.appendChild(artistImg);

//     let cardBody = document.createElement("div");
//     cardBody.classNameName = "card-body";

//     let cardTitle = document.createElement("h5");
//     cardTitle.classNameName = "card-title";
//     cardTitle.innerText = artist.name;
//     cardBody.appendChild(cardTitle);

//     let cardFooter = document.createElement("div");
//     cardFooter.classNameName = "card-footer";

//     let eventsBtn = document.createElement("a");
//     eventsBtn.classNameName = "btn btn-primary";
//     eventsBtn.innerText = "Check Events";
//     eventsBtn.style.backgroundColor = "green";
//     eventsBtn.onmouseover = () => { eventsBtn.style.opacity = "0.7" };
//     eventsBtn.onmouseout = () => { eventsBtn.style.opacity = "1" };
//     eventsBtn.onclick = () => { getArtistEvent(artist.name) };

//     let fbBtn = document.createElement("a");
//     fbBtn.classNameName = "fa fa-facebook";
//     fbBtn.innerHTML = " Facebook";
//     fbBtn.href = "" + artist.facebook_page_url;
//     fbBtn.style.marginLeft = "50px";
//     fbBtn.style.borderRadius = "200px"
//     fbBtn.style.backgroundColor = "white";

//     cardFooter.appendChild(eventsBtn);
//     cardFooter.appendChild(fbBtn);

//     artistCard.appendChild(cardBody);
//     artistCard.appendChild(cardFooter);

//     return artistCard;
// }