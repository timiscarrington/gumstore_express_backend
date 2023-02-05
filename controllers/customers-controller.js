const express = require('express')
const router = express.Router()

// import model (Customers)
const { Customers } = require('../models')

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

// http://localhost:4000/customers/email
router.get("/email", async (req, res) => {
    const { email } = req.query;
    try {
        const customer = await Customers.findOne({ email });
        if (!customer) return res.status(404).send({ error: "Customer not found" });
        res.status(200).send({ 
            _id: customer._id,
            email: customer.email, 
            first_name: customer.first_name, 
            last_name: customer.last_name 
          });
    } catch (err) {
        res.status(400).send({ error: "An error occurred" });
    }
});

// http://localhost:4000/customers/:id - GET
router.get("/:id", async (req, res) => {
    try {
        const customer = await Customers.findById(req.params.id);
        if (!customer) return res.status(404).send({ error: "Customer not found" });
        res.status(200).send(customer);
    } catch (err) {
        res.status(400).send({ error: "An error occurred" });
    }
});

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
