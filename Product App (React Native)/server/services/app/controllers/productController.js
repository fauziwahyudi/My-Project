const { Image, Category, Product, sequelize } = require("../models")


class ProductController {
    static async readProduct(req, res) {
        try {
            const products = await Product.findAll({
                
                order: [
                    ['id', 'ASC']
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: ['User','Category', 'Images'],
                // where: { authorId: req.user.id },
            })

            res.status(200).json(products)

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async readProductById(req, res) {
        try {
            const { id } = req.params
            // console.log(req.params);
            const product = await Product.findByPk(id, { include: ['User','Category', 'Images'] })
            if (!product) {
                throw { name: 'notFound' }
            }
            res.status(200).json(product)

        } catch (error) {
            if (error.name === "notFound") {
                res.status(404).json({ message: "Product Not Found" })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

    static async addProduct(req, res) {
        const t = await sequelize.transaction()
        try {
            let { name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3 } = req.body

            let slug = name.split(' ').join('-')

            const product = await Product.create({ name, description, slug, price, mainImg, categoryId, userMongoId }, { transaction: t })

            // let resultImage = []
            // resultImage = additionalImage.map((el) => {
            //     return {
            //         productId: createProduct.id,
            //         name: el
            //     }
            // })

            const image = await Image.bulkCreate(
                [
                    {
                        productId: product.id,
                        imgUrl: additionalImage1
                    },
                    {
                        productId: product.id,
                        imgUrl: additionalImage2
                    },
                    {
                        productId: product.id,
                        imgUrl: additionalImage3
                    }
                ], { transaction: t, validate: true }
                // resultImage
                // 
            )
            await t.commit();

            res.status(201).json({ product: product, image: image })

        } catch (error) {
            await t.rollback();
            // res.status(400).json(error)
            if (error.name === "SequelizeValidationError" || error.name === "AggregateError") {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
            console.log(error);
        }
    }

    static async detailImage(req, res) {
        try {
            let { productId } = req.params
            console.log(req.params);
            const product = await Product.findByPk(productId)
            if (!product) {
                throw { name: 'notFound' }
            }
            const image = await Image.findAll({ where: { productId } })
            if (!image) {
                throw { name: 'notFound' }
            }
            res.status(200).json(image)
        } catch (error) {
            if (error.name === 'notFound') {
                res.status(404).json({ message: 'data not found' })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

    static async editProduct(req, res) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params
            console.log(id);

            const product = await Product.findByPk(id, { transaction: t })
            if (!product) {
                throw { name: 'notFound' }
            }
            const { name, description, price, stock, mainImg, categoryId, additionalImage1, additionalImage2, additionalImage3 } = req.body

            await Image.destroy({
                where: { productId: product.id }
            }, { transaction: t })

            let slug = name.split(' ').join('-')
            
            await Product.update({ name, description, slug, price, stock, mainImg, categoryId }, { where: { id } }, { transaction: t })

            // let resultImage = []
            // resultImage = additionalImage.map((el) => {
            //     return {
            //         productId: product.id,
            //         name: el
            //     }
            // })

            const image = await Image.bulkCreate(
                [
                    {
                        productId: product.id,
                        imgUrl: additionalImage1
                    },
                    {
                        productId: product.id,
                        imgUrl: additionalImage2
                    },
                    {
                        productId: product.id,
                        imgUrl: additionalImage3
                    }
                ], { transaction: t, validate: true }
            )
            await t.commit()

            res.status(200).json({ message: "success updated" })

        } catch (error) {
            console.log(error);
            await t.rollback();
            if (error.name === "notFound") {
                res.status(404).json({ message: "Product Not Found" })
            } else if (error.name === "SequelizeValidationError" || error.name === "AggregateError") {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

    static async deleteProductById(req, res, next) {
        try {
            const { id } = req.params
            console.log(id);
            const product = await Product.findByPk(id)
            // console.log(product);
            await Product.destroy({ where: { id } })
            res.json({ message: `Product ${product.name} success to delete` })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ProductController