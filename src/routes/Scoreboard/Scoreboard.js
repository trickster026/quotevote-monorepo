import React, { Component } from "react"
import { Container, Grid } from "semantic-ui-react"

import ScoreboardHeader from "../../components/ScoreboardHeader/ScoreboardHeader"
import TopContents from "../../components/TopContents/TopContents"
import TopAuthors from "../../components/TopAuthors/TopAuthors"

import "./Scoreboard.css"

class Scoreboard extends Component {
  state = { query: { offset: 0, limit: 5 } }

  render = () => {
    return (
      <Container as={Container} className="scoreboard-rankings-section">
        <Grid>
          <ScoreboardHeader />
          <Grid.Row columns={2} stretched className="top-row">
            <Grid.Column width={12} className="top-content-column">
              <TopContents />
            </Grid.Column>
            <Grid.Column width={4} className="top-authors-column">
              <TopAuthors />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default Scoreboard
