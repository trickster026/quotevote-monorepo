import React, { Component } from "react"
import { Divider, Header, Grid, Image } from "semantic-ui-react"
import faker from "faker"
import "./Followers.css"
import _ from "lodash"

const columns = _.times(6, i => (
  <Grid.Column key={i}>
    <div align="center">
      <Image src={faker.internet.avatar()} circular />
      <small
        style={{ float: "middle" }}
      >{`${faker.name.firstName()} ${faker.name.lastName()}`}</small>
    </div>
  </Grid.Column>
))

class Followers extends Component {
  renderQuotes = () => {
    return <Grid columns={6}>{columns}</Grid>
    return <div>No quotes available</div>
  }

  render = () => {
    return (
      <div>
        <Header
          as="h1"
          style={{
            fontSize: 14,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 10,
            background: "rgba(150,150,150,0.1)",
            color: "rgba(50,50,50,0.7)"
          }}
        >
          Following
        </Header>
        {this.renderQuotes()}
      </div>
    )
  }
}

export default Followers
