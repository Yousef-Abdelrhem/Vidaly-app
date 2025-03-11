const Joi = require("joi");
const mongoose = require("mongoose");
const { genresSchema } = require("./genres.js");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: genresSchema, required: true },
  numberInStock: { type: Number, required: true },
  dailyRentalRate: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const Schema = Joi.object({
    title: Joi.string().min(0).max(255).required(),
    genre: Joi.object({ name: Joi.string().min(5).max(20).required() }),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255),
  });
  return Schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
