//@ts-check
/**@module */
import axios from "axios";

export default {

  /**
   * Gets all books
   * @function getBooks 
   * @param {*} username
   * */
  getBooks: function (user) {
    var url = "/api/books/?name=" + user.username;
    if (user.username !== "Guest...Login") url = `/api/books/protected?name=${user.username}&email=${user.email}`; // used for protected routes in books.js
    var token = user.token;
    return axios.get(url,
      {
        headers: { 'auth-token': token },       // send token thru, booksController middleware will verify before proceeding
      });
  },

  /**
   * Gets books from Google Books using title and authors keys for the search
   * https://www.googleapis.com/books/v1/volumes?q={search terms}
   * https://www.googleapis.com/books/v1/volumes?q=hockey+gretzky&callback=handleResponse
   * @function getGoogleBooks 
   * @param {*} req
   * */
  getGoogleBooks: function (req) {
    console.log("googleSearch: req: ", req);
    var url = `https://www.googleapis.com/books/v1/volumes?q=${req.title}`;
    return axios.get(url);
  },

  /**
   * Gets the book with the given id
   * @function getBook
   * @param {*} id*/
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },

  /**
   * Deletes the book with the given id
   * @function deleteBook
   * @param {*} id 
   */
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },

  /**
   * Saves a book to the database
   * @function saveBook
   * @param {*} bookData 
   */
  saveBook: function (bookData) {
    console.log("API.saveBook: bookData ", bookData);
    return axios.post("/api/books", bookData);
  }
};
