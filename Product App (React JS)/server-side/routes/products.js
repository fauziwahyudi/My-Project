const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const { authorizationProduct } = require('../middleware/authorization')

router.post('/', ProductController.addProduct)
router.get('/',  ProductController.readProduct)
router.put('/:id', authorizationProduct, ProductController.editProduct)
router.delete('/:id', authorizationProduct, ProductController.deleteProductById)
router.get('/:id', ProductController.readProductById)

module.exports = router