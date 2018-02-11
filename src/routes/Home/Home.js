import React, { PureComponent } from "react"
import { Grid, Container, Segment } from "semantic-ui-react"
import TopArtists from "../../components/TopArtists/topArtistsContainer"
import Welcome from "./Welcome"
import TrendingSongs from "./TrendingSongs/trendingSongsContainer"
import RecommendedSong from "./RecommendedSongs/recommendedSongsContainer"
import NewsFeed from "./NewsFeed"

class Home extends PureComponent {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <Welcome />
            </Grid.Column>
            <Grid.Column>
              <TopArtists />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <TrendingSongs />
            </Grid.Column>
            <Grid.Column width={8}>
              <RecommendedSong />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <NewsFeed />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Home
