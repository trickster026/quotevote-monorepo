import React, { PureComponent } from "react"
import { Card, Feed } from "semantic-ui-react"

class TopArtists extends PureComponent {
  render = () => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Top Artists</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label>Artist1</Feed.Label>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label>Artist2</Feed.Label>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label>Artist3</Feed.Label>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label>Artist4</Feed.Label>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label>Artist5</Feed.Label>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    )
  }
}

export default TopArtists
