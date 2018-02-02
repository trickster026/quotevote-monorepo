import React, { PureComponent } from "react"
import { Card, List } from "semantic-ui-react"
import PropTypes from "prop-types"

class TopArtists extends PureComponent {
  static propTypes = {
    artists: PropTypes.array
  }

  render = () => {
    const { artists } = this.props
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Top Artists</Card.Header>
        </Card.Content>
        <Card.Content>
          <List ordered relaxed>
            {artists &&
              artists.map(artist => (
                <List.Item key={artist.artistId}>
                  <List.Content>
                    <List.Header>{artist.artistName}</List.Header>
                    Score - {artist.totalScore}
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Card.Content>
      </Card>
    )
  }
}

export default TopArtists
