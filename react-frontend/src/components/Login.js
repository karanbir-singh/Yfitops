import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { Col, Image, Modal, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import { AppContext } from "../index.js";

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export function Login() {
    //> Context
    const { state, dispatch } = useContext(AppContext);

    //> Display "Sign in" buttons
    function displayAuthOptions() {
        ui.start('#auth', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // Login
                    dispatch(
                        {
                            type: "login",
                            payload: { userName: authResult.user.displayName, userEmail: authResult.user.email, userImage: authResult.user.photoURL }
                        });
                    return false;
                },
            },
        });
    }

    //> ...componentDidMount and componentDidUpdate
    useEffect(() => {
        // Check if the localStorage has a value with key 'firebaseui::rememberedAccounts'
        if (window.localStorage.getItem('firebaseui::rememberedAccounts') === null) {
            // If not, then call display login buttons
            displayAuthOptions();
            return;
        }

        // Otherwise, load user data
        let user = JSON.parse(window.localStorage.getItem('firebaseui::rememberedAccounts'))[0];
        dispatch({ type: "login", payload: { userName: user?.displayName, userEmail: user?.email, userImage: user?.photoUrl } });
    }, [])

    return (
        <>
            <Modal show={true} centered size="sm">
                <Modal.Body>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <Image className="login-img" src={logo} rounded fluid />
                            <h1>Yfitops</h1>
                        </Col>
                    </Row>
                    <div id="auth"></div>
                </Modal.Body>
            </Modal>
        </>
    );
}