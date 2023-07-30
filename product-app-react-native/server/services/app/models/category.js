'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, { foreignKey: "categoryId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Name is required` },
        notEmpty: { msg: `Name can't be empty` }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Image is required` },
        notEmpty: { msg: `Image can't be empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};