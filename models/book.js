//@ts-check
/**@module */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**@namespace bookSchema */
const bookSchema = new Schema({
  /**@name name*/
  username: { type: String, required: true },

  /**@name name*/
  title: { type: String, required: true },

  /**@name authors*/
  authors: { type: String, required: true },

  /**@name image*/
  image: { type: String, required: false },

  /**@name link*/
  link: { type: String, required: false },

  /**@name synopsis*/
  description: String,

  /**@name date*/
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("GoogleBook", bookSchema);

module.exports = Book; 
