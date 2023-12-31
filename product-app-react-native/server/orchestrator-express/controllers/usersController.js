const axios = require("axios");
const { userAPI } = require("../helpers/api_services");
const redis = require("../config/redis");

class Controllers {
  static async getAllUser(req, res) {
    try {
      const dataRedis = await redis.get("app:users");
      if (dataRedis) {
        const dataChace = JSON.parse(dataRedis);
        console.log(dataChace);
        return res.status(200).json(dataChace);
        
      }

      const { data } = await axios({
        method: "get",
        url: userAPI,
      });

      await redis.set("app:users", JSON.stringify(data));

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async getUserById(req, res) {
    try {

      const { id } = req.params;
      
      const { data } = await axios({
          method: "get",
          url: userAPI + `/${id}`,
        });
        
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async createUser(req, res) {
    try {
      const { email, username, password, phoneNumber, address } = req.body;

      const { data } = await axios({
        method: "post",
        url: userAPI + "/register",
        data: {
          email,
          username,
          password,
          phoneNumber,
          address,
        },
      });
      await redis.del("app:users");
      res.status(201).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async destroyUser(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const { data } = await axios({
        method: "DELETE",
        url: userAPI + `/${id}`,
      });

      await redis.del("app:users");
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = Controllers;
