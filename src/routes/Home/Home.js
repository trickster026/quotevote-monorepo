import React, { PureComponent } from "react"
import { Grid, Container, Segment } from "semantic-ui-react"

import TopArtists from "../../components/TopArtists/topArtistsContainer"
import Welcome from "./Welcome"
import TrendingSongs from "./TrendingSongs/trendingSongsContainer"
import RecommendedSong from "./RecommendedSongs/recommendedSongsContainer"
import NewsFeed from "./NewsFeed/newsFeedContainer"

class Home extends PureComponent {
  render = () => {
    console.log("this.props", this.props)

    return (
      <Segment as={Container} basic>
        <Grid doubling stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Welcome />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <TopArtists />
            </Grid.Column>
            <Grid.Column width={8}>
              <RecommendedSong />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <NewsFeed />
            </Grid.Column>
            <Grid.Column>
              <TrendingSongs />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Home
