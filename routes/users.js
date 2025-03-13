const auth = require("../middleware/auth.js");
const { User, validate } = require("../models/users.js");
let express = require("express");
let router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(404).send("email is already exists");
  }

  let userData = _.pick(req.body, ["name", "email", "password"]);
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  user = new User(userData);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(userData, ["_id", "name", "email", "password"]));
});

module.exports = router;
