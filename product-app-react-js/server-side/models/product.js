'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId", onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        Product.belongsTo(models.User, { foreignKey: "authorId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Product.hasMany(models.Image, { foreignKey: "productId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Product name is required` },
        notEmpty: { msg: `Product name can't be empty` }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Slug is required` },
        notEmpty: { msg: `Slug name can't be empty` }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: `Description is required` },
        notEmpty: { msg: `Description can't be empty` }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Price is required` },
        notEmpty: { msg: `Price can't be empty` },
        min: {
          args: 10000000,
          msg: `Minimum price 10000000`
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `MainImg is required` },
        notEmpty: { msg: `MainImg name can't be empty` }
      }
    },
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
 
  return Product;
};