const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

if (process.env.NODE_ENV = "production") {
    require('dotenv').config()
}

const { userTypeDefs, userResolvers } = require('./schemas/users');
const { productTypeDefs, productResolvers } = require('./schemas/products');
const { categoryTypeDefs, categoryResolvers } = require('./schemas/categories');

(async () => {
    const server = new ApolloServer({
        typeDefs: [userTypeDefs, productTypeDefs, categoryTypeDefs],
        resolvers: [userResolvers, productResolvers, categoryResolvers],
        introspection: true
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
})();