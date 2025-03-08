let mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres.js");
const customers = require("./routes/customers.js")

mongoose
  .connect("mongodb://localhost:27017/genres")
  .then(console.log("DB is connected"))
  .catch((err) => console.log(err));

// Middleware to parse JSON
app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
