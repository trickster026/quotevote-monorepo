import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import { BasicLayout } from "../../components/Layouts"
import { GlobalHeader } from "../../components/Header"
import {
  Home,
  Scoreboard,
  Login,
  Signup,
  Terms,
  RequestInvite,
  Shareables,
  SubmitContent,
  Artist,
  User,
  AppSettings
} from "../"
import PrivateRoute from "../../components/PrivateRoute"

class Subdomain extends Component {
  render = () => {
    const { domain } = this.props.match.params
    const domainURL = `/${domain}`
    return (
      <BasicLayout>
        <GlobalHeader />
        <Switch>
          <Route exact path={domainURL} component={Home} />
          <Route path={domainURL + "/home"} component={Home} />
          <Route path={domainURL + "/scoreboard"} component={Scoreboard} />
          <Route path={domainURL + "/login"} component={Login} />
          <Route path={domainURL + "/logout"} component={Login} />
          <Route path={domainURL + "/signup"} component={Signup} />
          <Route path={domainURL + "/terms"} component={Terms} />
          <Route path={domainURL + "/invite"} component={RequestInvite} />
          <Route
            path={domainURL + "/shareables/:code"}
            component={Shareables}
          />
          <PrivateRoute
            path={domainURL + "/submit-content"}
            component={SubmitContent}
          />
          <PrivateRoute
            path={domainURL + "/artist/:artistId"}
            component={Artist}
          />
          <PrivateRoute path={domainURL + "/user/:userId"} component={User} />
          <PrivateRoute
            path={domainURL + "/settings"}
            component={AppSettings}
          />
          <Route path={domainURL + "/:username"} component={User} />
        </Switch>
      </BasicLayout>
    )
  }
}

export default Subdomain
