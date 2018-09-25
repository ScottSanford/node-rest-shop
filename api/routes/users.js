const express = require('express')
const checkAuth = require('../middleware/check-auth')

// express router
const router = express.Router()

// Controller
const UsersController = require('../controllers/users')

// POST signup a new user
router.post('/signup', UsersController.signupUser)

// Login a user
router.post('/login', UsersController.loginUser)

// DELETE a user
router.delete('/:userId', checkAuth, UsersController.deleteUser)

module.exports = router
