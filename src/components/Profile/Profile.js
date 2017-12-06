import React, { PureComponent } from "react"
import {
  Image,
  Button,
  Segment,
  Container,
  Item,
  Table
} from "semantic-ui-react"
import defaultImage from "../../assets/image.png"

class Profile extends PureComponent {
  static defaultProps = {
    artist: {
      name: "Kendrick Lamar",
      score: 1000,
      up: 100,
      down: 10,
      followers: 1000
    }
  }

  render = () => {
    const { artist } = this.props
    return (
      <Segment as={Container} compact padded fluid basic>
        <Item.Group>
          <Item>
            <Item.Image>
              <Image src={defaultImage} width={300} height={300} />
              <Button fluid color="orange" style={{ marginTop: "10px" }}>
                Follow
              </Button>
            </Item.Image>

            <Item.Content>
              <Item.Header as="h1">{artist.name}</Item.Header>

              <Item.Description>
                <Table basic="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Score</Table.Cell>
                      <Table.Cell>{artist.score}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Up</Table.Cell>
                      <Table.Cell>{artist.up}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Down</Table.Cell>
                      <Table.Cell>{artist.down}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Followers</Table.Cell>
                      <Table.Cell>{artist.followers}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    )
  }
}

export default Profile
