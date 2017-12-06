import React, {Component} from "react"
import "./App.css"
import Header from "../Header/Header"
import Artist from "../../routes/Artist/Artist"
import User from "../../routes/User/User"
import {Route, Switch} from "react-router-dom"

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/artist/:artistName" component={Artist}/>
                    <Route path="/user/:userId" component={User}/>
                </Switch>
            </div>
        )
    }
}

export default App
