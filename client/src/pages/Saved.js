//@ts-check
/**@module*/
import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
    state = {
        books: [],
        title: "",
        authors: "",
        image: "",
        link: "",
        description: ""
    };
    // previousName = this.props.username;

    /**@function componentDidMount */
    componentDidMount() {
        this.loadBooks();
        this.previousName = this.props.username;
    }

    /**@function componentDidUpdate */
    componentDidUpdate() {
        if (this.previousName !== this.props.username) {  // if login or logout update books displayed
            this.loadBooks();
            this.previousName = this.props.username;
        }
    }

    /**@function loadBooks */
    loadBooks = () => {
        console.log("username: ", this.props.username);
        API.getBooks({ username: this.props.username, token: this.props.token, email: this.props.email })
            .then(res => {
                this.setState({ books: res.data, title: "", authors: "", image: "", link: "", description: "" })
            }
            )
            .catch(err => console.log(err));
    };

    /**@function deleteBook */
    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    /**@function handleInputChange */
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    /**@function handleFormSubmit */
    handleFormSubmit = event => {
        console.log("handleSubmit state.author:", this.state.authors);
        event.preventDefault();
        if (this.state.title && this.state.authors) {
            API.saveBook({
                username: this.props.username,
                title: this.state.title,
                authors: this.state.authors,
                image: this.state.image,
                link: this.state.link,
                description: this.state.description
            })
                .then(res => this.loadBooks())
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>

                    <Col size="md-12 sm-12">
                        <Jumbotron>
                            <h1>Books On My List</h1>
                        </Jumbotron>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <Link to={"/books/" + book._id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </Link>
                                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;
