import React, { Component } from "react"
import Header from "../Header/Header"
import Artist from "../../routes/Artist/artistContainer"
import User from "../../routes/User/UserContainer"
import Login from "../../routes/Login/Login"
import Home from "../../routes/Home/Home"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "../../routes/Login/PrivateRoute"

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Login} />
          <PrivateRoute path="/artist/:artistId" component={Artist} />
          <PrivateRoute path="/user/:userId" component={User} />
        </Switch>
      </div>
    )
  }
}

export default App
