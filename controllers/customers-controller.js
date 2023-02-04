const express = require('express')
const router = express.Router()

// import model (Customer)
const { Customers } = require('../models')
const db=('../models') //db.Customers

// Routes
// http://localhost:4000/customers/
router.get('/', async (req,res)=> {
    try {
        const allCustomers = await Customers.find({})
        res.status(200).json(allCustomers)
    } catch (err){
        res.status(400).json({error: err})
    }
})

// http://localhost:4000/customers/
router.post('/', async (req,res)=> {
    try {
        const newCustomer = await Customers.create(req.body)
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

// http://localhost:4000/customers/:id - GET
router.get('/:id', async (req,res)=> {
    try {
        const foundCustomer = await Customers.findById(req.params.id)
        res.status(200).json(foundCustomer)
    }catch (err) {
        res.status(400).json({error: err})
    }
})

// http://localhost:4000/customers/:id - DELETE
router.delete('/:id', async (req,res)=> {
    try {
        const deletedCustomer = await Customers.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedCustomer)
    }catch (err) {
        res.status(400).json({error: err})
    }
})

// http://localhost:4000/customers/:id - PUT
router.put('/:id', async (req,res)=> {
    try {
        const updatedCustomer = await Customers.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedCustomer)
    }catch (err) {
        res.status(400).json({error: err})
    }
})

module.exports = router