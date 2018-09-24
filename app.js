const express = require('express')

// Spin up express
const app = express()

// import API routes
const productRoutes = require('./api/routes/products')

/* 
   Set up middleware
   Use route name here so you don't need it in api route files
*/
app.use('/products', productRoutes)

// export app
module.exports = app