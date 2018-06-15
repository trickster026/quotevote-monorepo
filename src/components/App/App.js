import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { Domain } from "../../routes"

import Route404 from "../../routes/404.js"

import "./App.css"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Domain} />
        <Route component={Route404} />
      </Switch>
    )
  }
}

export default App
