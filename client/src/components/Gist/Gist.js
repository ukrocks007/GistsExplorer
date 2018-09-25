import React, { Component } from 'react';
import './Gist.css';
import {Panel,Row, Col, Grid, Image, Button, Glyphicon } from 'react-bootstrap';
import axios from 'axios';

class Gist extends Component {

    constructor(props){
        super(props);

        this.state = {starred : this.props.data.starred};
        console.log(this.props.data.files);
    }

    addStar() {
        console.log(this.state.id);
        axios.post('/gists/star/' + this.props.data.id, {
            headers: {
              'x-access-token': ""+localStorage.getItem("token")
            }
            }).then(response => {
                this.setState({});
            }).catch(err => {
                var win = window.open("https://gist.github.com/"+this.props.data.id, '_blank');
                win.focus();
            });
    }

    removeStar() {
        console.log(this.state.id);
        axios.post('/gists/unstar/' + this.props.data.id, {
            headers: {
              'x-access-token': localStorage.getItem("token")
            }
            }).then(response => {
            console.log(response);
        }).catch(err => {
            var win = window.open("https://gist.github.com/"+this.props.data.id, '_blank');
            win.focus();
        });
    }

  render() {
    return (
      <div className="Gist">
        <Panel bsStyle="info">
            <Panel.Heading>
                <Grid>
                    <Row>
                        <Col xs={1} md={1}>
                            <Image src={this.props.data.avatarUrl} responsive circle />
                        </Col>
                        <Col xs={4} md={4}>
                            <p><a href={this.props.data.userUrl}>{this.props.data.user}</a> ( created on {new Date(this.props.data.createdOn).toDateString()} )</p>
                        </Col>
                        <Col xs={3} md={3}>
                        <Button onClick={this.props.data.starred ? this.removeStar.bind(this)  : this.addStar.bind(this)}>
                            {this.props.data.starred ? "Remove from favourite" : "Add to favourite" }
                        </Button>
                        </Col>
                    </Row>
                </Grid>
            </Panel.Heading>
                <Panel.Body>
                    {this.props.data.description}
                    <ul>
                    {
                        this.props.data.files.map(function(file, index){
                            return <li key={index}><a href={file.raw_url}>{file.filename}</a>{" "}{file.language}</li>;
                        })
                    }
                    </ul>
                </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Gist;
