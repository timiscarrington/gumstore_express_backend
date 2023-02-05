const express = require('express')
const app = express()

// app dependencies
const cors = require('cors')
const morgan = require('morgan')

// controller imports

const productsController = require('./controllers/products-controller')
const cartController = require('./controllers/cart-controller')
const customersController = require('./controllers/customers-controller')
const loginController = require('./controllers/login-controller')
const logoutController = require('./controllers/logout-controller')

require('dotenv').config()
require('./config/db.connection') // node runs all of the code in db.connection

const { PORT } = process.env  

// express / app middleware
app.use(express.json())

// cors helper function
app.use(cors()) // allows for cross origin request - open channel 
// morgan request logger (for dev)
app.use(morgan('dev'))
// router middleware
app.use('/products', productsController)
app.use('/customers', customersController)
app.use('/cart', cartController)
app.use('/login', loginController)
app.use('/logout', logoutController)

// root - home / index route for api - redirects to the people index route 
app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))