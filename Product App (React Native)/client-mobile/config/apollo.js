import { ApolloClient, InMemoryCache } from "@apollo/client";
const BASE_URL = "https://zhiherm.fauziwahyudi.my.id/";

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

//   console.log(client.cache);

export default client;