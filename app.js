const express = require('express')
const morgan = require('morgan')

// Spin up express
const app = express()

// import API routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// MIDDLEWARE
// Log HTTP requests to Terminal
app.use(morgan('dev'))

// Routes that should handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// Handle Errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// Pass error from middleware above
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

// export app
module.exports = app