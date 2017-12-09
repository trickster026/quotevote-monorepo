import React, { Component } from "react"
import Header from "../Header/Header"
import Artist from "../../routes/Artist/artistContainer"
import User from "../../routes/User/User"
// import Footer from "../Footer/Footer"
import { Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/artist/:artistId" component={Artist} />
          <Route path="/user/:userId" component={User} />
        </Switch>
        {/*<Footer />*/}
      </div>
    )
  }
}

export default App
