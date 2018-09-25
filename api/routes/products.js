const checkAuth = require('../middleware/check-auth')
const express = require('express')
const multer = require('multer')

// express router
const router = express.Router()

// Controller
const ProductsController = require('../controllers/products')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        // null for no error and then path where you want to store the image
        callback(null, './uploads/')
    },
    filename(req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

// file filter
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        // reject a file
        callback(null, false)
    }
}

// init multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

// GET list of products
router.get('/', ProductsController.getProducts)

// POST a product to the list
router.post('/', checkAuth, upload.single('productImage'), ProductsController.createProduct)

// GET single product
router.get('/:productId', ProductsController.getProduct)

// PATCH/update part of a product
router.patch('/:productId', checkAuth, ProductsController.updateProduct)

// DELETE a product
router.delete('/:productId', checkAuth, ProductsController.deleteProduct)

module.exports = router
