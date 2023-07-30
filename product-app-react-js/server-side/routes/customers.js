const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')


router.get('/products', CustomerController.getAllProducts)
router.get('/products/:id', CustomerController.getAllProductsById)

module.exports = router