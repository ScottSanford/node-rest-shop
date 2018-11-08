const mongoose = require('mongoose')
const Product = require('../models/product')

exports.getProducts = (req, res) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(products => {
            const response = {
                status: 'OK',
                code: 200,
                totalCount: products.length,
                products: products.map(prod => {
                    return {
                        name: prod.name,
                        price: prod.price,
                        productImage: prod.productImage,
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
            res.status(500).json({
                error
            })
        })
}

exports.createProduct = (req, res) => {
    const createdProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    // Save product to database
    createdProduct.save()
        .then(result => {
            res.status(201).json({
                status: 'CREATED',
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
            res.status(500).json({
                error
            })
        })

}

exports.getProduct = (req, res) => {
    const id = req.params.productId
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    status: 'OK',
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
                    status: 'NOT FOUND',
                    code: 404,
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.updateProduct = (req, res) => {
    const id = req.params.productId
    const props = req.body
    Product.update({
            _id: id
        }, props)
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'OK',
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
}

exports.deleteProduct = (req, res) => {
    const id = req.params.productId
    Product.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'OK',
                code: 200,
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
                    body: {
                        name: 'Required String',
                        price: 'Required Number'
                    },
                    description: 'Add a product to the database.'
                }
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
}