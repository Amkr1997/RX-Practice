const { initializeDatabase } = require("./db/db.connect");
const { Books } = require("./models/books.model");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => res.send("Hello express"));

// get all books
app.get("/books", async (req, res) => {
  try {
    const allBooks = await Books.find();

    if (allBooks) {
      res.status(201).json({ message: "All Books Fetched", books: allBooks });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Internal server error" });
  }
});

// post book
app.post("/books", async (req, res) => {
  const { bookName, author, genre } = req.body;

  try {
    const addedBook = new Books({ bookName, author, genre });
    const savedBook = await addedBook.save();

    if (savedBook) {
      res
        .status(201)
        .json({ message: "Book added successfully", book: savedBook });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Internal server error" });
  }
});

// Update Book
app.post("/books/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const bookToUpdate = req.body;

  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, bookToUpdate, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res
        .status(201)
        .json({ message: "Book got updated", updatedBook: updatedBook });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete book
app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);

    if (deletedBook) {
      res.status(201).json({ message: "Book got deleted", book: deletedBook });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running at port", PORT);
});
