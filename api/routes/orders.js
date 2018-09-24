const express = require('express')
// express router
const router = express.Router()

// GET list of orders
router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'GET list of orders'
    })
})

// POST an order to the list
router.post('/', (req, res) => {
    res.status(201).json({
        status: 201,
        message: 'POST list of orders'
    })
})

// GET info about an order
router.get('/:orderId', (req, res) => {
    const id = req.params.orderId
    res.status(200).json({
        status: 200,
        id,
        message: 'POST list of orders'
    })
})

// DELETE info about an order
router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId
    res.status(200).json({
        status: 200,
        id,
        message: 'Deleted order!'
    })
})

module.exports = router
