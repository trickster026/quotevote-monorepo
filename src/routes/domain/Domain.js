import React, { Component } from "react"
import { Card, Container, Segment, Image, Button } from "semantic-ui-react"
import hiphopImage from "../../assets/hiphop.png"

class Domain extends Component {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Card.Group itemsPerRow={1}>
          <Card fluid color="black">
            <Card.Content>
              <Image floated="left" size="tiny" src={hiphopImage} />
              <Card.Header>HIPHOP SCOREBOARD</Card.Header>
              <Card.Meta>Vote for your favorite artist and songs!</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button floated="right" primary>
                Go to app
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    )
  }
}

export default Domain
