import React, { Component } from 'react';
import './GistsGroup.css';
import Gist from '../Gist/Gist';

class GistsGroup extends Component {
constructor(props){
    super(props);
}

  render() {
    return (
        <div className="GistsGroup">
            {
            this.props.data.map(function(gist, index){
                    return <Gist data={gist} />;
                })
            }
        </div>
    );
  }
}

export default GistsGroup;
