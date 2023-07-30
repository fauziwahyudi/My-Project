const express = require("express");
const Controller = require("../controllers/productsController");
const router = express.Router();


router.get('/', Controller.getAllProduct)
router.post('/', Controller.addProduct)
router.get('/:id', Controller.getProductById)
router.put('/:id', Controller.editProduct)
router.delete('/:id', Controller.destroyProduct)



module.exports = router;