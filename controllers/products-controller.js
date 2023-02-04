const express = require('express')
const router = express.Router()

// import model (Products)
const { Products } = require('../models')

const db = require('../models') // db.Products 

// Routes
// http://localhost:4000/products/
router.get('/', async (req,res)=> {
    try {
        const allProducts = await Products.find({})
        res.status(200).json(allProducts)
    } catch (err){
        res.status(400).json({error: err})
    }
})

// http://localhost:4000/products/
router.post('/', async (req,res)=> {
    try {
        const newProduct = await Products.create(req.body)
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

// http://localhost:4000/products/:id - GET
router.get('/:id', async (req,res)=> {
    try {
        const foundProduct = await Products.findById(req.params.id)
        res.status(200).json(foundProduct)
    }catch (err) {
        res.status(400).json({error: err})
    }
})
// http://localhost:4000/products/:id - DELETE
router.delete('/:id', async (req,res)=> {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedProduct)
    }catch (err) {
        res.status(400).json({error: err})
    }
})

// http://localhost:4000/products/:id - PUT
router.put('/:id', async (req,res)=> {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedProduct)
    }catch (err) {
        res.status(400).json({error: err})
    }
})

module.exports = router
