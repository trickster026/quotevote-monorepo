import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { Domain, Route404, Subdomain } from "../../routes"

import "./App.css"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Domain} />
        <Route path="/:domain" component={Subdomain} />
        <Route component={Route404} />
      </Switch>
    )
  }
}

export default App
