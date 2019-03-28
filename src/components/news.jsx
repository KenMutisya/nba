import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:8080/api/news`)
            .then(response => {
                console.log(response.data);
                return this.setState({ articles: response.data.articles });
            })
            .catch(e => console.log(e))
    }

    render() {
        const { articles } = this.state;
        console.log("AAA");
        console.log(articles);
        return (
            <Container>


                <h3>News</h3>
                {articles && articles.slice(0, 7).map((article) => (
                    <Row >
                        <Col md={4} lg={4}>
                            <div>
                                <img src={article.urlToImage} width="150" alt='' />
                            </div>
                        </Col>
                        <Col md={8} lg={8}>
                            <div key={article.publishedAt} style={{ "marginTop": -5, "marginBottom": 10 }}>
                                <h5><Link to={article.url}>{article.title}</Link></h5>
                                <p style={{ "marginBottom": 0 }}>{article.description}</p>
                                <small style={{ "marginTop": -5 }}>{article.author}</small>
                            </div>
                        </Col>
                    </Row>
                ))}


                <Row />
            </Container>
        )
    }
}