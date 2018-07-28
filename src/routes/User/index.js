import React, { Component } from "react"
import { Segment, Grid, Container } from "semantic-ui-react"

import CreatorPanel from "../../components/CreatorPanel/CreatorPanel"
import UserText from "../../components/UserText/UserText"
import VoteHistory from "../../components/VoteHistory/VoteHistory"
import QuoteWall from "../../components/QuoteWall/QuoteWall"

class User extends Component {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <CreatorPanel />
            </Grid.Column>
            <Grid.Column>
              <UserText />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <VoteHistory />
            </Grid.Column>
            <Grid.Column>
              <QuoteWall />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default User
