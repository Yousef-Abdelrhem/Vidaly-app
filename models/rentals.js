const Joi = require("joi");
let mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: new mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 50 },
    isGold: { type: Boolean, default: false, required: true },
    phone: { type: String, required: true, minLength: 5, maxLength: 50 },
  }),
  movie: new mongoose.Schema({
    title: { type: String, required: true },
    dailyRentalRate: { type: Number, require: true, min: 0, max: 255 },
  }),
  dateOut: { type: Date, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});
const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const Schema = Joi.object({
     customerId: Joi.string().require(),
     movieId: Joi.string().required(),
   });
  return Schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
