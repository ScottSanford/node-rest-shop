const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

exports.getOrders = (req, res) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name quantity')
        .exec()
        .then(orders => {
            res.status(200).json({
                status: 'OK',
                code: 200,
                totalCount: orders.length,
                orders: orders.map(order => {
                    return {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + order._id,
                            description: 'Return information on the specific order.'
                        }
                    }
                })
            })
        })
        .catch(error => res.status(500).json(error))
}

exports.createOrder = (req, res) => {
    Product.findById(req.body.productId)
        .then(product => {
            // If _id is null and the same length as mongoose _id value
            if (!product) {
                res.status(404).json({
                    status: 'NOT FOUND',
                    code: 404,
                    message: 'Product not found'
                })
            }
            // Create Order Object
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            // Save order to database
            return order.save()
        })
        .then(result => {
            res.status(201).json({
                status: 'CREATED',
                code: 201,
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders' + result._id,
                    description: 'Return information on specific order'
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                status: 'INTERNAL SERVER ERROR',
                code: 500,
                error
            })
        })
}

exports.getOrder = (req, res) => {
    const id = req.params.orderId
    Order.findById(id)
        .select('quantity product _id')
        .populate('product', '_id name price')
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json({
                    status: 'OK',
                    code: 200,
                    order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders',
                        description: 'Get list of all orders.'
                    }
                })
            } else {
                res.status(404).json({
                    status: 'NOT FOUND',
                    code: 404,
                    message: 'Order not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.deleteOrder = (req, res) => {
    const id = req.params.orderId
    Order.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'OK',
                code: 200,
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {
                        quantity: 'Number',
                        product: 'Required String'
                    },
                    description: 'Add an order to the database.'
                }
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
}