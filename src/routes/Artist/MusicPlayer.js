import React, { PureComponent } from "react"
import { Icon, Segment, Header, Grid } from "semantic-ui-react"

class MusicPlayer extends PureComponent {
  render = () => {
    return (
      <Segment textAlign="center">
        <Grid>
          <Grid.Row>
            <Grid.Column verticalAlign="center" width={6}>
              <Header as="h4">
                Artist Name - Song Name
                <Header.Subheader>
                  Score: 1000 Up: 100 Down: 100
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column width={10}>
              <Icon size="large" name="step backward" />
              <Icon size="large" name="play" />
              <Icon size="large" name="step forward" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default MusicPlayer
