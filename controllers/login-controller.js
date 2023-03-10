const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../models/Customers');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET must have a value' });
    }
    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
});

module.exports = router;
