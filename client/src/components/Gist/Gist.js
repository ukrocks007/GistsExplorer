import React, { Component } from 'react';
import './Gist.css';
import {Panel,Row, Col, Grid, Image, Button, Glyphicon } from 'react-bootstrap';

class Gist extends Component {
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
                        <Col xs={8} md={8}>
                            <p><a href={this.props.data.userUrl}>{this.props.data.user}</a> ( created on {this.props.data.createdOn} )</p>
                        </Col>
                        <Col xs={3} md={3}>
                        <Button>
                            <Glyphicon glyph="star" /> {this.props.data.starred ? "UnStar" : "Star" }
                        </Button>
                        </Col>
                    </Row>
                </Grid>
            </Panel.Heading>
            <Panel.Body>{this.props.data.description}</Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Gist;
