const HOST = process.env.APP_SERVICE_URL + "/products";
const axios = require("axios");
const redis = require("../config/redis")

const productTypeDefs = `#graphql
type Products {
    id : ID
    name : String
    slug : String
    description : String
    price : Int
    mainImg : String
    categoryId : Int
    userMongoId : String
    Category : Category
    Images : [Images]
    User : userMongoId
}

type userMongoId {
    _id: ID
    id : ID
    username : String
    email : String
}

type resultProduct{
    product : Products
    image : [Images]
}

type Category{
    id : ID
    name : String
}

type Images{
    id : ID
    productId : Int
    imgUrl : String
}

type messageProduct{
    message : String
}

type Query {
    getAllProducts: [Products]
    getProductById(id : ID!) : Products
  }

type Mutation{
    createProduct(
    name : String
    description : String
    price : Int
    mainImg : String
    categoryId : Int
    userMongoId : String
    additionalImage1 : String
    additionalImage2 : String
    additionalImage3 : String
    ) : resultProduct 

    editProduct(
    id : Int
    name : String
    description : String
    price : Int
    mainImg : String
    categoryId : Int
    userMongoId : String
    additionalImage1 : String
    additionalImage2 : String
    additionalImage3 : String
    ) : resultProduct

    destroyProduct(id : Int) : messageProduct 
}
`;
const productResolvers = {
    Query: {

        getAllProducts: async () => {
            // console.log("getAllProducts", ">>>>>>>>>>>");
            try {
                await redis.del("app:getAllProducts")
                const dataChace = await redis.get("app:getAllProducts");

                if (dataChace) {
                    return JSON.parse(dataChace);
                } else {

                }
                console.log(dataChace);

                const { data } = await axios({
                    method: "GET",
                    url: HOST,
                });

                await redis.set("app:getAllProducts", JSON.stringify(data));

                return data;

            } catch (error) {
                console.log(error);
            }
        },
        getProductById: async (_, { id }) => {
            try {

                const { data } = await axios({
                    method: "GET",
                    url: HOST + `/${id}`,
                });

                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Mutation: {
        createProduct: async (_, { name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3 }) => {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: HOST,
                    data: {
                        name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3
                    },
                });

                return data;
            } catch (error) {
                return error;
            }
        },
        editProduct: async (_, { id, name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3 }) => {
            try {
                const { data } = await axios({
                    method: "PUT",
                    url: HOST + `/${id}`,
                    data: {
                        name, description, price, mainImg, categoryId, userMongoId, additionalImage1, additionalImage2, additionalImage3
                    },
                });

                return data;
            } catch (error) {
                return error;
            }
        },
        destroyProduct: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "DELETE",
                    url: HOST + `/${id}`,
                });

                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};

module.exports = {
    productTypeDefs,
    productResolvers,
};