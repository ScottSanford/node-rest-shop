const checkAuth = require('../middleware/check-auth')
const express = require('express')

// express router
const router = express.Router()

// Controller
const OrdersController = require('../controllers/orders')

// GET list of orders
router.get('/', checkAuth, OrdersController.getOrders)

// POST an order to the list
router.post('/', checkAuth, OrdersController.createOrder)

// GET info about an order
router.get('/:orderId', checkAuth, OrdersController.getOrder)

// DELETE info about an order
router.delete('/:orderId', checkAuth, OrdersController.deleteOrder)

module.exports = router
