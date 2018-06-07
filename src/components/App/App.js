import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "../PrivateRoute"
import BasicLayout from "../Layouts/BasicLayout"

import Header from "../Header/Header"
import Artist from "../../routes/Artist/artistContainer"
import User from "../../routes/User/UserContainer"
import Login from "../../routes/Login/Login"
import Home from "../../routes/Home/Home"
import Scoreboard from "../../routes/Scoreboard/scoreboardContainer"

import Signup from "../../routes/Signup/Signup"
import Terms from "../../routes/Terms/Terms"
import Route404 from "../../routes/404.js"
import SubmitContent from "../../routes/SubmitContent/SubmissionForm"
import Shareables from "../../routes/Shareables/Shareables"
import RequestInvite from "../../routes/UserInvites/RequestInvite/RequestInvite"
import AppSettings from "../../routes/Settings/AppSettings"

import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="app">
        <BasicLayout>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/scoreboard" component={Scoreboard} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/terms" component={Terms} />
            <Route path="/invite" component={RequestInvite} />
            <Route path="/shareables/:code" component={Shareables} />
            <PrivateRoute path="/submit-content" component={SubmitContent} />
            <PrivateRoute path="/artist/:artistId" component={Artist} />
            <PrivateRoute path="/user/:userId" component={User} />
            <PrivateRoute path="/settings" component={AppSettings} />
            <Route path="/:username" component={User} />
            <Route component={Route404} />
          </Switch>
        </BasicLayout>
      </div>
    )
  }
}

export default App
