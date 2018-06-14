import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, concat } from "apollo-link"

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER + "/graphql"
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const { token } = operation.getContext()
  operation.setContext({
    headers: {
      authorization: token || localStorage.getItem("token")
    }
  })

  return forward(operation)
})

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

export default client
