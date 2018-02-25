import React, { PureComponent } from "react"
import { Header, Segment, List } from "semantic-ui-react"
import PropTypes from "prop-types"
import "./TopArtist.css"

class TopArtists extends PureComponent {
  static propTypes = {
    artists: PropTypes.array
  }

  render = () => {
    const { artists } = this.props
    return (
      <div>
        <Header className="header-module" inverted attached="top" as="h4">
          Top Artists
        </Header>
        <Segment className="top-artist-segment" attached>
          <List relaxed>
            {artists &&
              artists.map(artist => (
                <List.Item className="list-item" key={artist.artistId}>
                  <List.Content>
                    <List.Header className="list-item-header">
                      {`${artist.artistName} - ${artist.totalScore}`}
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </Segment>
      </div>
    )
  }
}

export default TopArtists
