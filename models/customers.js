let mongoose = require("mongoose");
let Joi = require("joi");

let customersSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  phone: { type: String, required: true, minLength: 5, maxLength: 50 },
  isGold: { type: Boolean, default: false, required: true },
});

let Customer = mongoose.model("Customer", customersSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;