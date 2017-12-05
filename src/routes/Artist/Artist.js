import React, { PureComponent } from "react"
import { Grid, Container, Segment } from "semantic-ui-react"
import Profile from "../../components/Profile/Profile"
import TopArtists from "../../components/TopArtists/TopArtists"
import Albums from "./Albums"
import MusicPlayer from "./MusicPlayer"

class Artist extends PureComponent {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Profile />
            </Grid.Column>
            <Grid.Column>
              <TopArtists />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={6}>
              <Albums />
            </Grid.Column>
            <Grid.Column width={10}>
              <MusicPlayer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Artist
