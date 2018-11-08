const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user')

exports.signupUser = (req, res) => {
    // Check if email exists in database
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            // if user already exists, don't save user
            if (user.length >= 1) {
                return res.status(409).json({
                    status: 'CONFLICT',
                    code: 409,
                    message: 'User already exists'
                })
            } else {
                // Encrypt the user's password with bcrypt
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).json({
                            status: 'INTERNAL SERVER ERROR',
                            code: 500,
                            error
                        })
                    } else {
                        // Create new user
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        // Save user to the database
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    status: 'CREATED',
                                    code: 201,
                                    message: 'User created'
                                })
                            })
                            .catch(error => res.status(500).json({
                                status: 'INTERNAL SERVER ERROR',
                                code: 500,
                                error
                            }))
                    }
                })
            }
        })
}

exports.loginUser = (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    status: 'NOT FOUND',
                    code: 404,
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        status: 'NOT FOUND',
                        code: 404,
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const payload = {
                        email: user[0].email,
                        userId: user[0]._id
                    }
                    const jtwOptions = {
                        expiresIn: '1hr'
                    }
                    const token = jwt.sign(payload, process.env.JWT_KEY, jtwOptions)

                    return res.status(200).json({
                        status: 'OK',
                        code: 200,
                        message: 'Auth successful',
                        token
                    })
                }

                return res.status(401).json({
                    status: 'NOT FOUND',
                    code: 404,
                    message: 'Auth failed'
                })
            })
        })
        .catch(error => res.status(500).json({
            status: 'INTERNAL SERVER ERROR',
            code: 500,
            error
        }))
}

exports.deleteUser = (req, res) => {
    const id = req.params.userId
    User.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                status: 'OK',
                code: 200,
                message: 'User deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/user/signup',
                    body: {
                        email: 'Required String',
                        password: 'Required String'
                    },
                    description: 'Add a user'
                }
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
}