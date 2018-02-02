import React, { PureComponent } from "react"
import { Segment, Header, Grid } from "semantic-ui-react"
import PropTypes from "prop-types"

const mp3 =
  "https://s3.amazonaws.com/scoreboard.com/10+The+Notorious+B.I.G+-+Juicy.mp3"

class MusicPlayer extends PureComponent {
  static propTypes = {
    score: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    artistName: PropTypes.string,
    songTitle: PropTypes.string
  }

  static defaultProps = {
    score: 0,
    upvotes: 0,
    downvotes: 0,
    artistName: "Artist Name",
    songTitle: "Song Name"
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
                  <Header.Content>
                    {this.props.artistName} - {this.props.songTitle}
                  </Header.Content>
                  <Header.Subheader>
                    Score: {this.props.score} Up: {this.props.upvotes} Down:
                    {this.props.downvotes}
                  </Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <audio controls>
                  <source src={mp3} type="audio/mp3" />
                </audio>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default MusicPlayer
