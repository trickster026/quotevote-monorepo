import React from "react"
import { Redirect, Route } from "react-router-dom"
import { tokenValidator } from "../../actions/creators/loginActionCreator"

const verifyToken = () => {
  return tokenValidator()
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        verifyToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
