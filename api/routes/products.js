const express = require('express')
const mongoose = require('mongoose')

// Products Schema
const Product = require('../models/product')

// express router
const router = express.Router()

// GET list of products
router.get('/', (req, res) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(products => {
            const response = {
                status: 'ok',
                code: 200,
                totalCount: products.length,
                products: products.map(prod => {
                    return {
                        name: prod.name,
                        price: prod.price,
                        _id: prod._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + prod._id,
                            description: 'Get product details.'
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({error})
        })
})

// POST a product to the list
router.post('/', (req, res) => {
    const createdProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    // Save product to database
    createdProduct.save()
        .then(result => {
            res.status(201).json({
                status: 'ok',
                code: 201,
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id,
                        description: 'Get product details.'
                    }
                }
            })
        })
        .catch(error => {
            res.status(500).json({error})
        })

})

// GET single product
router.get('/:productId', (req, res) => {
    const id = req.params.productId
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    status: 'ok',
                    code: 200,
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products',
                        description: 'Get list of all products.'
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

// PATCH/update part of a product
router.patch('/:productId', (req, res) => {
    const id = req.params.productId
    const props = req.body
    Product.update({_id: id}, props)
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'ok',
                code: 200,
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id,
                    description: 'See updated product changes.'
                }
            })
        })
        .catch(error => res.status(500).json(error))
})

// DELETE a product
router.delete('/:productId', (req, res) => {
    const id = req.params.productId
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'ok',
                code: 200,
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: {name: 'Required String', price: 'Required Number'},
                    description: 'Add a product to the database.'
                }
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router
