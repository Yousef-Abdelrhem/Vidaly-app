let mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres.js");
const customers = require("./routes/customers.js");
const movies = require("./routes/movies.js");
const rentals = require("./routes/rentals.js");
const users = require("./routes/users.js");

mongoose
  .connect("mongodb://localhost:27017/genres")
  .then(console.log("DB is connected"))
  .catch((err) => console.log(err));

// Middleware to parse JSON
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
