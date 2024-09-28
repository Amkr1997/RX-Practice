const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
});

const Books = mongoose.model("BooksThirdTime", bookSchema);

module.exports = { Books };
