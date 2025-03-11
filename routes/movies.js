const { Movie, validate } = require("../models/movies.js");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  let Id = req.params.id;
  let movie = await Movie.findById(Id);
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  let Id = req.params.id;
  let movie = await Movie.findByIdAndUpdate(
    Id,
    {
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) {
    return res.status(404).send("Genre Not Found");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  let Id = req.params.id;
  let movie = await Movie.findByIdAndDelete(Id);

  if (!movie) {
    return res.status(404).send("Genre Not Found");
  }
  res.send(movie); // Send the updated genres array
});

module.exports = router;
