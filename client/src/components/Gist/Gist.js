import React, { Component } from 'react';
import './Gist.css';

class Gist extends Component {
  render() {
    return (
      <div className="Gist">
        <div className="Gist-header">
          <img src={avatar} className="Gist-avatar" />
          <div className="Gist-user">
            <a href >{user}</a>
          </div>
          <div className="Gist-star">
            <button>Star</button>
          </div>
        </div>
        <div className="Gist-created">
          <p>created on {createdOn}</p>
        </div>
        <div className="Gist-description"> 

        </div>
      </div>
    );
  }
}

export default Gist;
