import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BasicLayout } from "../Layouts"
import { GlobalHeader } from "../Header"
import Footer from "../Footer/Footer"
import {
  AppSettings,
  Boards,
  Content,
  CreateNewScoreboard,
  Home,
  Login,
  RequestInvite,
  Scoreboard,
  Shareables,
  Signup,
  SubmitContent,
  Terms,
  User
} from "../../routes"
import PrivateRoute from "../PrivateRoute"

import "react-toastify/dist/ReactToastify.css"
import "semantic-ui-css/semantic.min.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { Container } from "semantic-ui-react"
import ScoreBoard from "../../material-ui/layouts/Scoreboard.js"
import "./App.css"
import GlobalChat from "../Chat/GlobalChat"

class App extends Component {
  render() {
    const url = window.location.href
    const startChar = url.indexOf("/", 8)
    const path = url.substr(startChar, url.length)
    return (
      <div>
        <div>
          <Switch>
            <Route exact path={"/"} component={ScoreBoard} />
            <Route path={"/home"} component={ScoreBoard} />
            <Route path={"/scoreboard"} component={Scoreboard} />
            <Route path={"/top-content"} component={Scoreboard} />
            <Route
              path={"/create-scoreboard"}
              component={CreateNewScoreboard}
            />
            <Route path={"/login"} component={Login} />
            <Route path={"/logout"} component={Login} />
            <Route path={"/signup"} component={Signup} />
            <Route path={"/terms"} component={Terms} />
            <Route path={"/invite"} component={RequestInvite} />
            <Route path={"/shareables/:code"} component={Shareables} />
            <Route exact path={"/boards/:domain"} component={Boards} />
            <PrivateRoute path={"/submit-content"} component={SubmitContent} />
            <PrivateRoute
              path={"/boards/:domain/content/:contentId"}
              component={Content}
            />
            <PrivateRoute path={"/user/:userId"} component={User} />
            <PrivateRoute path={"/settings"} component={AppSettings} />
            {/* <Route path={"/:username"} component={User} /> */}
          </Switch>
        </div>
        <GlobalChat />
        {path !== "/invite" && <Footer />}
      </div>
    )
  }
}

export default App
