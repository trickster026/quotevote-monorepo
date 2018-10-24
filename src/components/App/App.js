import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { BasicLayout } from "../Layouts"
import { GlobalHeader } from "../Header"
import {
  Home,
  CreateNewScoreboard,
  Scoreboard,
  Login,
  Signup,
  Terms,
  RequestInvite,
  Shareables,
  SubmitContent,
  User,
  AppSettings,
  Content,
  Boards
} from "../../routes"
import PrivateRoute from "../PrivateRoute"

import "react-toastify/dist/ReactToastify.css"
import "semantic-ui-css/semantic.min.css"
import "@fortawesome/fontawesome-free/css/all.css"

import "./App.css"

class App extends Component {
  render() {
    return (
      <BasicLayout>
        <GlobalHeader />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/home"} component={Home} />
          <Route path={"/scoreboard"} component={Scoreboard} />
          <Route path={"/create-scoreboard"} component={CreateNewScoreboard} />
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
      </BasicLayout>
    )
  }
}

export default App
