const axios = require("axios");
const { appAPI, userAPI } = require("../helpers/api_services");
const redis = require("../config/redis");

class Controllers {
  static async getAllProduct(req, res) {
    try {
      const dataChace = await redis.get("app:products")

      if (dataChace) {
        console.log(dataChace);
        return res.status(200).json(JSON.parse(dataChace));
      }

      const { data } = await axios({
        method: "get",
        url: appAPI,
      });

      await redis.set("app:products", JSON.stringify(data))

      res.status(200).json(data);

    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async addProduct(req, res) {
    try {

      let { name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3 } = req.body;
      //   console.log(name, description, price, imgUrl, categoryId, nameIngredient);
      const { data } = await axios({
        method: "post",
        url: appAPI,
        data: {
          name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3
        },
      });

      await redis.del("app:products")

      res.status(201).json(data);

    } catch (error) {
      // console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params

      const { data: product } = await axios({
        method: "get",
        url: appAPI + `/${id}`
      });

      const { data: user } = await axios({
        method: "get",
        url: userAPI + `/${product.userMongoId}`
      });

      const obj = {
        product, user
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async editProduct(req, res) {
    try {

      const { id } = req.params
      let { name, description, price, stock, mainImg, categoryId, additionalImage1, additionalImage2, additionalImage3 } = req.body;
      
      const { data } = await axios({
        method: "put",
        url: appAPI + `/${id}`,
        data: {
          name, description, price, stock, mainImg, categoryId, additionalImage1, additionalImage2, additionalImage3
        },
      });

      await redis.del("app:products")

      res.status(200).json(data);

    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async destroyProduct(req, res) {
    try {
      const { id } = req.params

      const { data } = await axios({
        method: "delete",
        url: appAPI + `/${id}`
      });

      await redis.del("app:products")

      res.status(200).json(data);
      
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }


}

module.exports = Controllers;
