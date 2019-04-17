import React, { Component } from "react"
import { Container, Grid } from "semantic-ui-react"

import ScoreboardHeader from "../../components/ScoreboardHeader/ScoreboardHeader"
import TopContents from "../../components/TopContents/TopContents"
import TopAuthors from "../../components/TopAuthors/TopAuthors"

import "./Scoreboard.css"

const defaultPageFilter = {
  searchTerm: "",
  searchBy: "",
  dateRange: null
}

class Scoreboard extends Component {
  state = { pageFilter: defaultPageFilter }

  handleFilterChange = pageFilter => {
    this.setState({ pageFilter })
  }

  render = () => {
    return (
      <Container as={Container} className="scoreboard-rankings-section">
        <Grid>
          <ScoreboardHeader handleFilterChange={this.handleFilterChange} />
          <Grid.Row columns={2} stretched className="top-row">
            <Grid.Column width={12} className="top-content-column">
              <TopContents pageFilter={this.state.pageFilter} />
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
