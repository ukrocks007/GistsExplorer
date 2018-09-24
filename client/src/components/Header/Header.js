import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img className="logo" src={logo} />
        <p className="title">Gists Explorer</p>
        <button className="starred">Starred</button>
        <button className="loginWithGithub">Login with Github</button>
      </div>
    );
  }
}

export default Header;
