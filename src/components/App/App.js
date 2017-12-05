import React, { Component } from "react"
import "./App.css"
import Header from "../Header/Header"
import Artist from "../../routes/Artist/Artist"
import { Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/artist/:artistName" component={Artist} />
        </Switch>
      </div>
    )
  }
}

export default App
