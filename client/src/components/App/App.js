import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import Header from '../Header/Header';
import GistsGroup from '../GistsGroup/GistsGroup';
import axios from 'axios';
import {Pager} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      data: [],
    }
  }

  async componentWillMount(){
    await axios.get('/gists')
      .then(response => {
        //let array = JSON.parse(response);
        console.log(response.data);
        this.setState({data: response.data});
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <GistsGroup data={this.state.data} />
          <Pager>
            <Pager.Item href="#">Previous</Pager.Item>{' '}
            <Pager.Item href="#">Next</Pager.Item>
          </Pager>
        </div>
      </div>
    );
  }
}

export default App;
