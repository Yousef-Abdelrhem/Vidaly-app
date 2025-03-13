const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../models/users.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("email or password is invalid");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("email or password is invalid");
  }

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const Schema = Joi.object({
    email: Joi.string().min(7).max(50).email(),
    password: Joi.string().min(5).max(255),
  });
  return Schema.validate(user);
}

module.exports = router;
