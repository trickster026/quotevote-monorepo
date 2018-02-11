import React, { PureComponent } from "react"
import { Segment, Header, List, Image, Dimmer, Loader } from "semantic-ui-react"
import PropTypes from "prop-types"

class RecommendedSongs extends PureComponent {
  static propTypes = {
    songs: PropTypes.array
  }

  static defaultProps = {
    songs: [
      {
        thumbnail: "https://dummyimage.com/100x100/000/fff",
        title: "Unknown Song",
        artistName: "Unknown Artist"
      }
    ]
  }

  render = () => {
    if (this.props.loading) {
      return (
        <Segment attached style={{ minHeight: "100px" }}>
          <Dimmer active>
            <Loader size="small">Loading Lyrics</Loader>
          </Dimmer>
        </Segment>
      )
    }
    return (
      <div>
        <Header inverted attached="top" as="h4">
          Recommended Songs
        </Header>
        <Segment attached>
          <List animated verticalAlign="middle">
            {this.props.songs.map((song, index) => (
              <List.Item key={index}>
                <Image src={song.thumbnail} size="mini" />
                <List.Content>
                  <List.Header as="a">{song.title}</List.Header>
                  <List.Description>{song.artistName}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </div>
    )
  }
}

export default RecommendedSongs
