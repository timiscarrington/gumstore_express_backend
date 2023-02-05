///////////////////////////////
const mongoose = require('mongoose');
require('dotenv').config()
const { MONGODB_URI } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);

mongoose.connection.on('open', ()=> console.log('You are connected to MONGODB'))
mongoose.connection.on('close', ()=> console.log('You are disconnected to MONGODB'))
mongoose.connection.on('error', ()=> console.log((err)))