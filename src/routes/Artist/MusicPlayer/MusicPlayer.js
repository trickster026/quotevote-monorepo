import React, { PureComponent } from "react"
import { Segment, Header, Grid, Label } from "semantic-ui-react"
import SpotifyPlayer from "react-spotify-player"
import PropTypes from "prop-types"

class MusicPlayer extends PureComponent {
  static propTypes = {
    score: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    spotifyUri: PropTypes.string.isRequired
  }

  static defaultProps = {
    score: 0,
    upvotes: 0,
    downvotes: 0
  }

  render = () => {
    return (
      <div>
        <Header inverted attached="top" as="h4">
          Music Player
        </Header>
        <Segment attached textAlign="center">
          <Grid>
            <Grid.Row textAlign="left">
              <Grid.Column verticalAlign="middle" width={16}>
                <SpotifyPlayer
                  uri={this.props.spotifyUri}
                  size={{ width: "100%", height: 80 }}
                  view="list"
                  theme="white"
                />
                <Label.Group color="black">
                  <Label>
                    Score<Label.Detail>{this.props.score}</Label.Detail>
                  </Label>
                  <Label>
                    Upvotes<Label.Detail>{this.props.upvotes}</Label.Detail>
                  </Label>
                  <Label>
                    Downvotes<Label.Detail>{this.props.downvotes}</Label.Detail>
                  </Label>
                </Label.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default MusicPlayer
