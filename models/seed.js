require('../config/db.connection')
const mongoose = require('mongoose')
const productsRaw = require('./products.json')
const Product = require('./Products')

function parsedProducts(productsRaw){
    return productsRaw.map((product)=>{
        const {title, image, description, price, qty, image2} = product
        return ({title, image, description, price, qty, image2})
    })
}

async function seedProducts (){
    try{
        const allDeleted = await Product.deleteMany({})
        console.log(`Deleted ${allDeleted.deletedCount} previous products.`)

        const prodData = parsedProducts(productsRaw)
        const seeded = await Product.insertMany(prodData)
        console.log(`Seeded ${seeded.length} products to the database.`)

    } catch(err){
        console.error('Error while seeding the database:', err)
    } finally {
        await mongoose.disconnect()
        console.log('Disconnected from the database.')
    }
}

seedProducts()