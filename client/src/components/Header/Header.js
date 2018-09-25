import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

import {Button, Nav, Navbar, NavItem, Image} from 'react-bootstrap';
class Header extends Component {

    constructor(props){
        super(props);
        this.state = {loggedIn : this.props.loggedIn, showStarred: false};
        console.log("Header loggedIn: "+this.props.loggedIn);
    }

    logout() {
        localStorage.setItem("token", "");
        this.setState({loggedIn : false});
    }

    showStarred() {
        if (!this.state.showStarred) {
            this.setState({
                showStarred: true
            });
            this.props.starred();
        } else {
            this.setState({
                showStarred: false
            });
            this.props.showGists();
        }
    }

    render() {
            return (

    <Navbar inverse collapseOnSelect >
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Gists Explorer</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                {this.state.loggedIn ? 
                    (<Button onClick={this.showStarred.bind(this)} bsStyle="primary">{this.state.showStarred ? "Show All" : "Show Favourites"}</Button>) : ""}
                </NavItem>
                {!this.state.loggedIn ? (
                <NavItem eventKey={2} href="https://github.com/login/oauth/authorize?client_id=778f41cf857e92c6934d">
                    <Button href="https://github.com/login/oauth/authorize?client_id=778f41cf857e92c6934d" bsStyle="link">Login With GitHub</Button>
                </NavItem>
                ) : 
                (
                <NavItem eventKey={3} >
                    <Button onClick={this.logout.bind(this)} bsStyle="primary">Logout</Button>
                </NavItem>
                )
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>

    );
  }
}

export default Header;
