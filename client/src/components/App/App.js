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
      page: 1,
      per_page: 6,
    }

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  async componentWillMount(){
    await axios.get('/gists/'+this.state.page+'/'+this.state.per_page)
      .then(response => {
        //let array = JSON.parse(response);
        console.log(response.data);
        this.setState({data: response.data});
      })
  }

  nextPage(){
    console.log("Fetching");
    this.setState({page: this.state.page+1});
    axios.get('/gists/'+this.state.page+'/'+this.state.per_page)
      .then(response => {
        //let array = JSON.parse(response);
        console.log(response.data);
        this.setState({data: response.data});
      })
  }

  previousPage(){
    console.log("Fetching");
    this.setState({page: this.state.page-1});
    axios.get('/gists/'+this.state.page+'/'+this.state.per_page)
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
            <Pager.Item onClick={this.previousPage} disabled={this.state.page==1}>Previous</Pager.Item>{' '}
            <Pager.Item onClick={this.nextPage}>Next</Pager.Item>
          </Pager>
        </div>
      </div>
    );
  }
}

export default App;
