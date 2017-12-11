import React, { Component } from "react"
import Header from "../Header/Header"
import Artist from "../../routes/Artist/artistContainer"
import User from "../../routes/User/UserContainer"
import Home from "../../routes/Home/Home"
import { Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/artist/:artistId" component={Artist} />
          <Route path="/user/:userId" component={User} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App
