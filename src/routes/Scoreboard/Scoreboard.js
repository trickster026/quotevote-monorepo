import React, { PureComponent } from "react"
import { Container, Segment, Grid, Header } from "semantic-ui-react"

import TopContents from "../../components/TopContents/TopContents"
import TopAuthors from "../../components/TopAuthors/TopAuthors"

class Scoreboard extends PureComponent {
  state = { query: { offset: 0, limit: 5 } }

  render = () => {
    return (
      <Segment as={Container} basic>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Header textAlign="center" as="h1" style={{ fontSize: 36 }}>
                  Scoreboard Rankings
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} stretched>
            <Grid.Column>
              <TopContents />
            </Grid.Column>
            <Grid.Column>
              <TopAuthors />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Scoreboard
