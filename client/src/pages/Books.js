//@ts-check
/**@module*/
import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
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
    console.log("loadBooks username: ", this.props.username);
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
        <Row fluid="">
          {/* if only showing "Saved" items then adjust columns to cover full page(12) no half(6) */}
          <Col hidden={this.props.saved} size={this.props.saved ? "md-12" : "md-6"}>
            <Jumbotron>
              <h1>Save a Book to Your List?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.authors}
                onChange={this.handleInputChange}
                name="authors"
                placeholder="Author(s) (required)"
              />
              <Input
                value={this.state.link}
                onChange={this.handleInputChange}
                name="link"
                placeholder="Link (Optional)"
              />
              <Input
                value={this.state.image}
                onChange={this.handleInputChange}
                name="image"
                placeholder="Image (Optional)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.authors && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          {/* </div> */}
          <Col hidden={false} size={this.props.saved ? "md-12 sm-12" : "md-6 sm-12"}>
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
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

export default Books;
