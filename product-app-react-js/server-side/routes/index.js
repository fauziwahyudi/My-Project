const express = require('express')
const router = express.Router()
const routerUsers = require("./users")
const routerCustomer = require("./customers")
const routerProducts = require("./products")
const routerCategories = require("./categories")
const routerImages = require("./images")
const authentication = require('../middleware/authentication')

router.use("/", routerUsers)
router.use('/customers',routerCustomer)

router.use(authentication)
router.use("/products", routerProducts)
router.use("/categories", routerCategories)
router.use("/images", routerImages)

module.exports = router