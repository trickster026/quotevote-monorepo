import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  Container,
  Segment,
  Image,
  Button,
  Header,
  Icon
} from "semantic-ui-react"

import { domains } from "../../common/domains"

class Domain extends Component {
  render = () => {
    return (
      <Segment as={Container} basic padded="very">
        <Segment inverted color="black">
          <Segment basic textAlign="center">
            <Header as="h2" icon inverted>
              <Icon name="sitemap" />
              Landing Area
              <Header.Subheader>Choose where you are going</Header.Subheader>
            </Header>
          </Segment>
          <Card.Group itemsPerRow={1}>
            {domains.map(domain => (
              <Card key={domain.key} fluid>
                <Card.Content>
                  <Image floated="left" size="tiny" src={domain.image} />
                  <Card.Header>{domain.title}</Card.Header>
                  <Card.Meta>{domain.meta}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    as={Link}
                    floated="right"
                    primary
                    to={"/" + domain.key}
                  >
                    Go to app
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </Segment>
    )
  }
}

export default Domain
