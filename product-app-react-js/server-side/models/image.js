'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, { foreignKey: "productId", onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  Image.init({
    productId: DataTypes.INTEGER,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `ImgUrl is required` },
        notEmpty: { msg: `ImgUrl can't be empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};