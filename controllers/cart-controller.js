const express = require('express')
const router = express.Router()

const { Cart } = require('../models')

const db = require('../models') // db.Carts
// GET all carts
router.get('/', async (req, res) => {
  try {
    const allCarts = await Cart.find({})
    res.status(200).json(allCarts)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

// POST a new cart
router.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create(req.body)
    res.status(201).json(newCart)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

// GET a single cart by ID
router.get('/:id', async (req, res) => {
  try {
    const foundCart = await Cart.findById(req.params.id)
    res.status(200).json(foundCart)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

// DELETE a cart by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedCart)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

// UPDATE a cart by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedCart)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

module.exports = router
