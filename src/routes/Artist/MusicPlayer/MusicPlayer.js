import React, { PureComponent } from "react"
import { Segment, Header, Grid } from "semantic-ui-react"
import PropTypes from "prop-types"

const mp3 =
  "https://s3.amazonaws.com/prod.tracker2/resource/86893622/10%20The%20Notorious%20B.I.G%20-%20Juicy.mp3?response-content-disposition=inline&response-content-type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJBSFJ4TCVKKGAIA%2F20180128%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180128T132045Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=fcba3ac983cb4c472e87e40ee604d8dcae96f5b7f32e4e75136165e8ef3a512d"

class MusicPlayer extends PureComponent {
  static propTypes = {
    score: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired
  }

  static defaultProps = {
    score: 0,
    upvotes: 0,
    downvotes: 0,
    artistName: "Artist Name",
    songTitle: "Song Name"
  }

  componentDidUpdate = () => {
    console.log("it updated")
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
