let { Customer, validate } = require("../models/customers.js");
let express = require("express");
let router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  let Id = req.params.id;
  let customer = await Customer.findById(Id);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let customers = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customers = await customers.save();
  res.send(customers);
});

router.put("/:id", async (req, res) => {
  let Id = req.params.id;
  let customer = await Customer.findByIdAndUpdate(Id, req.body, { new: true });
  if (!customer) {
    return res.status(404).send("Genre Not Found");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  let Id = req.params.id;
  let customers = await Customer.findByIdAndDelete(Id);

  if (!customers) {
    return res.status(404).send("Genre Not Found");
  }
  res.send(customers); // Send the updated genres array
});

module.exports = router;
