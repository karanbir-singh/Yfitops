import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import { AppContext } from "../index.js";
const user = require('../user.js');

export function ReactSidenav() {

    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    console.log(selected);
                }}

                onToggle={(expanded) => {
                    dispatch({ type: 'side-nav expanded', payload: expanded });
                }}

                style={{ backgroundColor: '#343a40', zIndex: 1, position: 'fixed', top: '59px', left: 0}}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.60em' }} >home</i>
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="upload">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >add</i>
                        </NavIcon>
                        <NavText>
                            Upload track
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="recent played">
                        <NavIcon>
                            <i className="material-icons" style={{ fontSize: '1.80em' }} >slow_motion_video</i>
                        </NavIcon>
                        <NavText>
                            Recent played
                        </NavText>

                        <NavItem eventKey="recent played/track1">
                            <NavText>
                                Upload track
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="recent played/track2">
                            <NavText>
                                Upload track
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    );
}