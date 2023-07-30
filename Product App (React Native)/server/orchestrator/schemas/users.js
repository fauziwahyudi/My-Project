const axios = require("axios")

const HOST = process.env.USER_SERVICE_URL;

const userTypeDefs = `#graphql
type User {
    _id: ID
    id : ID
    username : String
    email : String
    role : String
    phoneNumber : String
    address : String
}

type userCreatedResult{
    statusCode: Int
    id : String
    email : String
}

type userDeleted{
    message : String
}

type Query {
    getAllUsers: [User]
    getUserById(id : String) : User
  }

type Mutation {
    createUser(
        username : String
        email : String
        password : String
        role : String
        phoneNumber : String
        address : String
    ) : userCreatedResult

    destroyUser(id : String) : userDeleted
}
`
const userResolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: HOST + '/users'
                })
                // console.log(data, ">>>>>>>>>>>>>>>>>>>");
                return data
            } catch (error) {
                console.log(error);
            }

        },
        getUserById: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: HOST + '/users' + `/${id}`
                })
                console.log(data);
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createUser: async (_, { username, email, password, role, phoneNumber, address }) => {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: HOST + '/users' + '/register',
                    data: { username, email, password, role, phoneNumber, address }
                })

                return data
            } catch (error) {
                console.log(error);
            }
        },

        destroyUser: async (_, { id }) => {
            try {

                const { data } = await axios({
                    method: 'DELETE',
                    url: HOST + '/users' + `/${id}`,
                })

                return data
            } catch (error) {
                return error
            }
        }
    }
};

module.exports = {
    userTypeDefs, userResolvers
}
