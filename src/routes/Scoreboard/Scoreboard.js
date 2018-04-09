import React, { PureComponent } from "react"
import { Container, Segment, Grid } from "semantic-ui-react"
import Flipboard from "../../components/Flipboard/Flipboard"

class Scoreboard extends PureComponent {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Grid doubling stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <Flipboard
                title="Top Artists"
                data={this.props.topArtists}
                loading={this.props.loading}
              />
            </Grid.Column>
            <Grid.Column>
              <Flipboard
                title="Top Users"
                data={this.props.topUsers}
                loading={this.props.loading}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Scoreboard
