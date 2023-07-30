const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')


router.get('/:productId', ProductController.detailImage)

module.exports = router