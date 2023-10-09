import { ApolloClient, InMemoryCache } from "@apollo/client";
const token = localStorage.getItem('token');
export const client = new ApolloClient({
 uri: "https://graphql-demo.dev.aicall.ru/graphql",
 headers: {
   authorization: token ? `Bearer ${token}` : "",
 },
 cache: new InMemoryCache(),
});
