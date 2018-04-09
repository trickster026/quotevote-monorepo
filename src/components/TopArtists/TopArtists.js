import React, { PureComponent } from "react"
import { Header, Segment, List, Grid } from "semantic-ui-react"
import PropTypes from "prop-types"
import FlipCard from "../FlipCard/FlipCard"
import "./TopArtist.css"

const PAD_LENGTH = 19
const pad = (char, length, value, direction = "right") => {
  if (direction === "right") {
    return value + char.repeat(Math.max(char, length - value.length))
  } else {
    return char.repeat(Math.max(char, length - value.length)) + value
  }
}

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
              artists.map((artist, index) => {
                let artistName = ""
                if (artist.artistName.length > PAD_LENGTH) {
                  artistName = artist.artistName.substring(0, PAD_LENGTH)
                } else {
                  artistName = pad(" ", PAD_LENGTH, artist.artistName)
                }
                return (
                  <div key={index} className="list-item">
                    <Grid columns="equal" verticalAlign="middle">
                      <Grid.Row>
                        <Grid.Column>
                          <h4>{artistName}</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <FlipCard
                            content={artist.totalScore.toString()}
                            width={22}
                            height={30}
                            fontSize={16}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                )
              })}
          </List>
        </Segment>
      </div>
    )
  }
}

export default TopArtists
