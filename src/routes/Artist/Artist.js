import React, { PureComponent } from "react"
import { Grid, Container, Segment } from "semantic-ui-react"
import Profile from "../../components/Profile/Profile"
import TopArtists from "../../components/TopArtists/topArtistsContainer"
import Albums from "./Albums"
import MusicPlayer from "./MusicPlayer/musicPlayerContainer"
import Lyrics from "./Lyrics/lyricsContainer"
import { string, number, arrayOf, shape } from "prop-types"

class Artist extends PureComponent {
  static propTypes = {
    artist: shape({
      name: string,
      score: number,
      up: number,
      down: number,
      followers: number,
      image: string
    }),
    albums: arrayOf(
      shape({
        name: string,
        id: number,
        songs: arrayOf(
          shape({
            title: string,
            songId: number,
            albumId: number
          })
        )
      })
    )
  }

  static defaultProps = {
    artist: {},
    albums: []
  }

  render = () => {
    return (
      <Segment as={Container} basic>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Profile artist={this.props.artist} />
            </Grid.Column>
            <Grid.Column>
              <TopArtists />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={6}>
              <Albums
                albums={this.props.albums}
                loading={this.props.albums.length <= 0}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <MusicPlayer songId={this.props.currentSong} />
              <br />
              <Lyrics />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Artist
