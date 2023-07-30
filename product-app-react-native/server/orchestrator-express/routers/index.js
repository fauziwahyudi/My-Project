const express = require("express");
const router = express.Router();
const routerUser = require('./users')
const routerProducts = require('./products')
const routeCategory = require('./category')

router.use("/users",routerUser);
router.use("/products",routerProducts);
router.use("/categories",routeCategory);

module.exports = router;