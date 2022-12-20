const express = require("express");
const bookmarks = express.Router();
const { validateURL } = require("../models/validations.js");
const bookmarksArray = require("../models/bookmark.js");

// bookmarks.use(req, res, next) => {
//   console.log('This middleware runs for EVERY bookmark route');
//   next();
// }

// GET ROUTE for /bookmarks (app.use in app.js handles the entry point for the controller)
bookmarks.get("/", (req, res) => {
  res.json(bookmarksArray);
});

// bookmarks endpoint for POST
// CREATE
bookmarks.post("/", validateURL, (req, res) => {
  bookmarksArray.push(req.body);
  res.json(bookmarksArray[bookmarksArray.length - 1]);
});

// SHOW ROUTE
bookmarks.get("/:index", (req, res) => {
  const { index } = req.params;
  // res.json(bookmarksArray[index]);
  // error handling
  if (bookmarksArray[index]) {
    res.status(200).json(bookmarksArray[index]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// DELETE
bookmarks.delete("/:indexArray", (req, res) => {
  if (bookmarksArray[req.params.arrayIndex]) {
    const deletedBookMark = bookmarksArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedBookMark);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
bookmarks.put("/:arrayIndex", (req, res) => {
  if (bookmarksArray[req.params.arrayIndex]) {
    bookmarksArray[req.params.arrayIndex] = req.body;
    res.status(200).json(bookmarksArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = bookmarks;
