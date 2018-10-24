import React, { PureComponent } from "react"
import { Container, Grid } from "semantic-ui-react"

import TopContents from "../../components/TopContents/TopContents"
import TopAuthors from "../../components/TopAuthors/TopAuthors"

import "./Scoreboard.css"

class Scoreboard extends PureComponent {
  state = { query: { offset: 0, limit: 5 } }

  render = () => {
    return (
      <Container as={Container} className="scoreboard-rankings-section">
        <Grid>
          <Grid.Row columns={1} className="scoreboard-rankings-header-row">
            <Grid.Column
              width={16}
              className="scoreboard-rankings-header-column"
            >
              <div className="scoreboard-rankings-header">
                <center>
                  <h3>Scoreboard Rankings</h3>
                </center>
                <div className="scoreboard-rankings-icons">
                  <i className="fas fa-sort-amount-down fa-2x" />
                  &nbsp;&nbsp;
                  <i className="fas fa-search fa-2x" />
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>

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
