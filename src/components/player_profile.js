import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Player from './player';
import RosterSmall from './roster_small';


axios.defaults.withCredentials = true;

export default class PlayerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Player player_id={this.props.match.params.id}/>
                    </Col>
                </Row>
            </Container>
        )
    }


}