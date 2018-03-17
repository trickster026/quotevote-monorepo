import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App/App"
import registerServiceWorker from "./registerServiceWorker"
import "semantic-ui-css/semantic.min.css"
import { BrowserRouter as Router } from "react-router-dom"

import { ApolloProvider } from "react-apollo"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, concat } from "apollo-link"

import store, { persistor } from "./reducers/store"

const baseUri =
  process.env.NODE_ENV === "production"
    ? "http://34.239.105.165:5000/graphql"
    : "http://localhost:5000/graphql"

const httpLink = new HttpLink({ uri: baseUri })

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

export const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
)
registerServiceWorker()
