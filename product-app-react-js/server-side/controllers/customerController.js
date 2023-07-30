const { Product, Image } = require('../models/index')

class CustomerController {
    static async getAllProducts(req, res) {
        try {

            const products = await Product.findAll(
                {
                    order: [
                        ['id', 'ASC']
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: ['User', 'Category', 'Images']
                }
            )
            res.status(200).json(products)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async getAllProductsById(req, res) {
        try {
            const { id } = req.params
            const product = await Product.findByPk(id, { attributes: {
                exclude: ['createdAt', 'updatedAt']
            }, include: ['Category', 'Images'] })
            if (!product) {
                throw { name: 'notFound' }
            }
            res.status(200).json(product)
        } catch (error) {
            if (error.name === "notFound") {
                res.status(404).json({ message: "Item Not Found" })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

}

module.exports = CustomerController