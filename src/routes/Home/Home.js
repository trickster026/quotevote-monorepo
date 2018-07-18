import React, { Component } from "react"
import { Grid, Segment, Container, Header } from "semantic-ui-react"

import TopContent from "../../components/TopContent/TopContent"
import TopAuthors from "../../components/TopAuthors/TopAuthors"

class Home extends Component {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Segment>
          <Header textAlign="center" as="h1" style={{ fontSize: 36 }}>
            Scoreboard Analytics Dashboard
          </Header>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <TopContent />
              </Grid.Column>
              <Grid.Column>
                <TopAuthors />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    )
  }
}

export default Home
