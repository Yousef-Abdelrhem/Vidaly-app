const Joi = require("joi");
let mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 20 },
});
const Genre = mongoose.model("Genre", genresSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genresSchema = genresSchema;
