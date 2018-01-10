import React, { PureComponent } from "react"
import { Icon, Segment, Header, Grid } from "semantic-ui-react"
import PropTypes from "prop-types"

class MusicPlayer extends PureComponent {
  static propTypes = {
    score: PropTypes.number.isRequired,
    upvote: PropTypes.number.isRequired,
    downvote: PropTypes.number.isRequired
  }

  static defaultProps = {
    score: 0,
    upvote: 0,
    downvote: 0
  }

  render = () => {
    return (
      <div>
        <Header attached="top" as="h4">
          Music Player
        </Header>
        <Segment attached textAlign="center">
          <Grid>
            <Grid.Row textAlign="left">
              <Grid.Column verticalAlign="middle" width={6}>
                <Header as="h4">
                  <Header.Content>Artist Name - Song Name</Header.Content>
                  <Header.Subheader>
                    Score: {this.props.score} Up: {this.props.upvote} Down:
                    {this.props.downvote}
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
      </div>
    )
  }
}

export default MusicPlayer
