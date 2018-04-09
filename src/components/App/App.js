import React, { Component } from "react"
import Header from "../Header/Header"
import Artist from "../../routes/Artist/artistContainer"
import User from "../../routes/User/UserContainer"
import Login from "../../routes/Login/Login"
import Home from "../../routes/Home/Home"
import Scoreboard from "../../routes/Scoreboard/scoreboardContainer"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "../../routes/Login/PrivateRoute"
import Signup from "../../routes/Signup/Signup"
import Terms from "../../routes/Terms/Terms"
import Route404 from "../../routes/404.js"
import "./App.css"
import RequestInvite from "../../routes/UserInvites/RequestInvite/RequestInvite"
import ManageInvites from "../../routes/UserInvites/ManageInvites/manageInvitesContainer"
import EditProfile from "../../routes/User/EditProfile/EditProfile"

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/scoreboard" component={Scoreboard} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/terms" component={Terms} />
          <Route path="/invite" component={RequestInvite} />
          <Route path="/invites/manage" component={ManageInvites} />
          <PrivateRoute path="/artist/:artistId" component={Artist} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <PrivateRoute path="/user/:userId" component={User} />
          <Route path="/:username" component={User} />
          <Route component={Route404} />
        </Switch>
      </div>
    )
  }
}

export default App
