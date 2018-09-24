import React, { Component } from 'react';
import './Gist.css';

class Gist extends Component {
  render() {
    return (
      <div className="Gist">
        <header className="Gist-header">
          <img src={logo} className="Gist-logo" alt="logo" />
          <h1 className="Gist-title">Welcome to React</h1>
        </header>
        <p className="Gist-intro">
          To get started, edit <code>src/Gist.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Gist;
