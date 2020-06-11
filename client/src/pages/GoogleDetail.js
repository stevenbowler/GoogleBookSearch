//@ts-check
/**@module */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

/**
 * Called from {@link module:client/src/pages/Search.js}, 
 * @class
 */
class GoogleDetail extends Component {
    constructor(props) {
        super(props);
    }
    /**  
     * Called from {@link module:client/src/pages/Search.js}, 
     * see state variable setting to <Link to={pathname:"/search/:id", state:{authors: book.authors}}}>
     * @name state
     * */
    state = {
        book: {
            authors: this.props.location.state.authors,
            title: this.props.location.state.title,
            description: this.props.location.state.description
        },
    };


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                {this.state.book.title} by {this.state.book.authors}
                            </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        <article style={{ color: "white" }}>
                            <h1 style={{ color: "white" }}>Description</h1>
                            <p>
                                {this.state.book.description}
                            </p>
                        </article>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-2">
                        <Link to="/search">← Back to Titles and Authors</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GoogleDetail;
