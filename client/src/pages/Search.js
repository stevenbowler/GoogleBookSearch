//@ts-check
/**@module*/
import React, { Component } from "react";
import AddBtn from "../components/AddBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, GoogleListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {

    state = {
        books: [],
        title: "",
        authors: "",
        image: "",
        link: "",
        description: ""
    };

    /**
     * Set previousName to be used to determine if there was a state change
     * @function componentDidMount */
    componentDidMount() {
        this.previousName = this.props.username;
        if (sessionStorage.getItem("googleBooks") === "") return;
        var googleBooks = JSON.parse(sessionStorage.getItem("googleBooks"));
        console.log("componentDidMount sessionStorage googleBooks: ", googleBooks);
        if (typeof googleBooks !== null && typeof googleBooks !== undefined) {
            this.loadBooks(googleBooks);
        }
    }


    /**@function componentDidUpdate */
    componentDidUpdate() {
        // if (this.previousName !== this.props.username) {  // if login or logout update books displayed
        // this.loadBooks(JSON.parse(sessionStorage.getItem("googleBooks")));
        // this.previousName = this.props.username;
        // }
    }


    /**
     * Parse the Google books format array into simpler array (remove the volumeInfo key)
     * @function googleBooksParse 
     * @param {Array<object>} googleBooks
     * */
    googleBooksParse = (googleBooks) => {
        console.log("googleBooks googleBooksParse: ", googleBooks);
        return googleBooks.map(book => ({
            key: book.id,
            _id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            link: book.volumeInfo.previewLink,
            // image: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description
        }));
    }


    /**
     * Load books from the Google Books search
     * Called from {@link handleFormSubmit}, {@link deleteBook}, {@link componentDidUpdate}
     * @function loadBooks 
     * @param {*} googleBooks
     * */
    loadBooks = (googleBooks) => {
        console.log(typeof googleBooks);
        if (!googleBooks) return;
        // if (!res) return;
        // var googleBooks = res.data.items;
        var googleBooksArray = this.googleBooksParse(googleBooks);
        this.setState({ books: googleBooksArray, title: "", authors: "", image: "", link: "", description: "" });
    };


    /**@function deleteBook */   // TODO this takes a book from the found list and adds to personal list, need more params
    addGoogleBook = bookData => {
        console.log("bookData: ", bookData);
        API.saveBook(bookData)
            // .then(res => this.loadBooks())
            .then(res => {
                console.log("addGoogleBook returned from user database: ", res)
            })
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
        // console.log("handleSubmit state.author:", this.state.title);
        event.preventDefault();
        // if (this.state.title && this.state.authors) {
        if (this.state.title) {
            API.getGoogleBooks({
                username: this.props.username,
                title: this.state.title,
                authors: this.state.authors,
                image: this.state.image,
                link: this.state.link,
                description: this.state.description
            })
                .then(res => {
                    var googleBooks = res.data.items;
                    sessionStorage.setItem("googleBooks", JSON.stringify(res.data.items));     // set for return to page see componentDidUpdate
                    // var googleBooks = this.googleBooksParse(res.data.items);
                    console.log("handleSubmit googleBooks: ", googleBooks);
                    this.loadBooks(googleBooks);
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row fluid="">
                    <Col hidden={false} size="md-6">
                        <Jumbotron>
                            <h1>Search Google Books</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Enter Search Here (required)"
                            />
                            <FormBtn
                                // disabled={!(this.state.authors && this.state.title)}
                                disabled={!(this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Book</FormBtn>

                        </form>
                    </Col>
                    <Col hidden={false} size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Found On Google Books</h1>
                        </Jumbotron>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <GoogleListItem key={book._id}>
                                        <Link key={book._id}
                                            to={{
                                                pathname: `/search/${book._id}`,
                                                state: { authors: book.authors, title: book.title, description: book.description, link: book.link }
                                            }}>
                                            <strong style={{ color: "black" }}>
                                                {book.title} by {book.authors}
                                            </strong>
                                        </Link>
                                        <AddBtn onClick={() => this.addGoogleBook({
                                            username: this.props.username,
                                            title: book.title.replace(/" "/g, "+"),
                                            authors: book.authors[0],
                                            image: book.image,
                                            link: book.link,
                                            description: book.description
                                        })} />
                                    </GoogleListItem>
                                ))}
                            </List>
                        ) : (
                                <h3 style={{ color: "white" }}>No Results to Display...yet</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;
