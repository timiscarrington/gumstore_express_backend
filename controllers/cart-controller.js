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

// POST a new item to a cart by ID
router.post('/:id/items', async (req, res) => {
  try {
    const foundCart = await Cart.findById(req.params.id)
    const newItem = {
      product: req.body.product,
      qty: req.body.qty,
      title: req.body.title,
      image: req.body.image,
    }
    foundCart.items.push(newItem)
    await foundCart.save()
    res.status(201).json(foundCart)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})


//Get Route to get a cart Item by its ID
router.get('/:id/items/:itemId', async (req, res) => {
  try {
    const foundCart = await Cart.findById(req.params.id)
    const foundItem = foundCart.items.id(req.params.itemId)
    res.status(200).json(foundItem)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})


// UPDATE an item in a cart by ID
// UPDATE a cart item by ID
router.put('/:id/item/:itemId', async (req, res) => {
  try {
  const foundCart = await Cart.findById(req.params.id)
  const itemToUpdate = foundCart.items.id(req.params.itemId)
  itemToUpdate.qty = req.body.qty
  itemToUpdate.title = req.body.title
  itemToUpdate.image = req.body.image
  const updatedCart = await foundCart.save()
  res.status(200).json(updatedCart)
  } catch (err) {
  res.status(400).json({ error: err })
  }
  })

// DELETE a cart item by ID
router.delete('/:id/items/:itemId', async (req, res) => {
  try {
    const foundCart = await Cart.findById(req.params.id)
    const itemToDelete = foundCart.items.id(req.params.itemId)
    itemToDelete.remove()
    await foundCart.save()
    res.status(200).json(foundCart)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

module.exports = router