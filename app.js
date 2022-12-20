// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();
const morgan = require("morgan");
const bookmarksController = require("./controllers/bookmarksController.js");

app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});

app.use(express.json());
app.use(morgan("tiny"));
app.use("/bookmarks", bookmarksController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 PAGE
// app.get("*", (req, res) => {
//   res.json({ error: "Page not found" });
// });

// When we open up our Chrome Dev Tools and go to the Network tab, we can see that this file loads with an http status of 304 or 200. But because this is a 404 page not found, we should make sure we are sending through the correct status code.

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// EXPORT
module.exports = app;
