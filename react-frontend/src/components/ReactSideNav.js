import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
const user = require('../user.js');

export function ReactSidenav() {
    return (
        <>
            <SideNav
                onSelect={(selected) => {
                    console.log(selected);
                }}
                
                style={{backgroundColor: '#343a40', marginLeft: '12px', zIndex: 0}}
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
                </SideNav.Nav>
            </SideNav>
        </>
    );
}