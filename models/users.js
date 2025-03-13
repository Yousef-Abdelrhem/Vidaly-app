const Joi = require("joi");
let mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");  

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, min: 5, max: 1024, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(7).max(50).email(),
    password: Joi.string().min(5).max(255),
  });
  return Schema.validate(user);
}

module.exports.User = User;
exports.validate = validateUser;
