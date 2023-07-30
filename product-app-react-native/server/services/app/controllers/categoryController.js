const { Category } = require('../models/index')

class CategoryController {
    static async readAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async addCategory(req, res) {
        try {
            const newCategory = await Category.create({
                name: req.body.name
            })
            res.status(200).json(newCategory)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    static async editCategory(req, res) {
        try {
            const { id } = req.params
            // console.log(id);

            const category = await Category.findByPk(id)
            if (!category) {
                throw { name: 'notFound' }
            }

            const { name } = req.body

            await Category.update({ name }, { where: { id } })

            res.status(200).json({ message: "success updated" })

        } catch (error) {
            // console.log(error, ">>>>>>>>>>>>>>>");
            if (error.name === "notFound") {
                res.status(404).json({ message: "Category Not Found" })
            } else if (error.name === "SequelizeValidationError" || error.name === "AggregateError") {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

    static async deleteCategory(req, res) {
        try {
            let { id } = req.params
            const category = await Category.findByPk(id)
            if (!category) {
                throw { name: 'dataNotFound' }
            }
            const deleted = await Category.destroy({ where: { id } })
            res.status(200).json({ message: `${category.name} success deleted` })
        } catch (error) {
            if (error.name === "dataNotFound") {
                res.status(404).json({ message: 'Data Not Found' })
            } else {
                res.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }
}

module.exports = CategoryController
