import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App/App"
import registerServiceWorker from "./registerServiceWorker"
import "semantic-ui-css/semantic.min.css"
import { BrowserRouter as Router } from "react-router-dom"

import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, concat } from "apollo-link"

// const httpLink = new HttpLink({ uri: "" })

const baseUri =
  process.env.NODE_ENV == "production"
    ? "http://107.20.29.153/graphql"
    : "http://localhost:5000/graphql"

const httpLink = new HttpLink({ uri: baseUri })
localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYnJvbkBlbWFpbC5jb20iLCJfaWQiOiI1OWIwMDM3NTBlMzc2NjA0MTQ0MDE3MWYiLCJpYXQiOjE1MTI5OTYwNzh9.MhDHKSGYU2F8fpeWxOT7b4jimD9-N4FwBZe4z-OT4YE"
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token")
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
)
registerServiceWorker()
