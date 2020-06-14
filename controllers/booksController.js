//@ts-check

const db = require("../models");

// Defining methods for the booksController
/**@module */
module.exports = {
  /**@function findAll */
  findAll: function (req, res) {
    console.log("booksController findAll: req.query.name: ", req.query.name);
    db.Book
      // .find({ username: req.originalUrl.slice(13) })
      .find({ username: req.query.name })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function findById */
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function create */
  create: function (req, res) {
    console.log("booksController req.body: ", req.body);
    db.Book
      .create(req.body)
      .then(dbModel => {
        console.log("booksController dbModel: ", dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  /**@function update */
  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  /**@function update */
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
