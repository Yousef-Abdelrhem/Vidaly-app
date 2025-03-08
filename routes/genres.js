const { Genre, validate } = require("../models/genres.js");
let express = require("express");
let router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  let Id = req.params.id;
  let genre = await Genre.findById(Id);
  res.send(genre);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  let Id = req.params.id;
  let genre = await Genre.findByIdAndUpdate(
    Id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    return res.status(404).send("Genre Not Found");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  let Id = req.params.id;
  let genre = await Genre.findByIdAndDelete(Id);

  if (!genre) {
    return res.status(404).send("Genre Not Found");
  }
  res.send(genre); // Send the updated genres array
});

module.exports = router;
