import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

import {Button, Nav, Navbar, NavItem, Image} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (

    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Gists Explorer</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    <Button bsStyle="primary">Starred</Button>
                </NavItem>
                <NavItem eventKey={2} href="#">
                    <Button bsStyle="primary">Login With GitHub</Button>
                </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

    );
  }
}

export default Header;
