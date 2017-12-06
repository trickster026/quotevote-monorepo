import React, { PureComponent } from "react"
import { Card, Feed } from "semantic-ui-react"

class FantasyLabel extends PureComponent {
    render = () => {
        return (
            <Card fluid style={{ minHeight: "100%" }}>
              <Card.Content>
                <Card.Header>Fantasy Label</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label>2 Pac</Feed.Label>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label>Notorious BIG</Feed.Label>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label>Nas</Feed.Label>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label>JayZ</Feed.Label>
                  </Feed.Event>

                </Feed>
              </Card.Content>
            </Card>
        )
    }
}

export default FantasyLabel
