const express = require('express')
// express router
const router = express.Router()

// GET list of products
router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Handling GET requests for /products'
    })
})

// POST a product to the list
router.post('/', (req, res) => {
    res.status(201).json({
        status: 201,
        message: 'Handling POST requests for /products'
    })
})

// GET single product
router.get('/:productId', (req, res) => {
    const id = req.params.productId
    const response = (message) => {
        res.status(200).json({
            status: 200,
            id,
            message
        })
    }

    if (id === 'special') {
        response('You found the special id, brah!')
    } else {
        response('GET request for basic product.')
    }
})

// PATCH/update a product
router.patch('/:productId', (req, res) => {
    res.status(200).json({
        message: 'Updated product!'
    })
})

// DELETE a product
router.delete('/:productId', (req, res) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
})

module.exports = router
