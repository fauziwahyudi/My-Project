const HOST = process.env.APP_SERVICE_URL + "/categories";
const axios = require("axios");

const categoryTypeDefs = `#graphql
    type Category{
        id : ID
        name : String
        image : String
    }

   type messageCategory{
         message : String
   }

    type Query{
        getAllCategories : [Category]
    }

    type Mutation{
        createCategory(
            name : String
            image : String
        ) : Category

        editCategory(
            id : Int
            name : String
            image : String
        ) : Category

        destroyCategory(id : Int) : messageCategory
    }
`;

const categoryResolvers = {
    Query: {
        getAllCategories: async () => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: HOST,
                });

                return data;
            } catch (error) {
                return error;
            }
        },
    },

    Mutation: {
        createCategory: async (_, { name, image }) => {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: HOST,
                    data: {
                        name, image
                    },
                });

                return data;
            } catch (error) {
                return error;
            }
        },

        editCategory: async (_, { id, name, image }) => {
            try {
                const { data } = await axios({
                    method: "PUT",
                    url: HOST + `/${id}`,
                    data: {
                        name, image
                    },
                });

                return data;
            } catch (error) {
                // console.log(error);
                return error;
            }
        },

        destroyCategory: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "DELETE",
                    url: HOST + `/${id}`,
                });

                return data;
            } catch (error) {
                return data;
            }
        },
    },
};

module.exports = { categoryResolvers, categoryTypeDefs };