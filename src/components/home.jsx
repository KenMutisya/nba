import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Standings from './standings';
import News from './news';


axios.defaults.withCredentials = true;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }

    render() {

        return (
            <Container>
                {/* <h2>Home</h2> */}

                <Row>
                    <Col md={7} lg={7}>
                        <News />
                    </Col>
                    <Col md={5} lg={5}>
                        <Standings />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;