import React, { PureComponent } from "react"
import {
  Image,
  Button,
  Segment,
  Container,
  Item,
  Table
} from "semantic-ui-react"
import defaultImage from "../../../assets/image.png"
import { string, number, array } from "prop-types"

class Profile extends PureComponent {
  static propTypes = {
    name: string,
    image: string,
    score: number,
    up: number,
    down: number,
    followers: array
  }

  static defaultProps = {
    name: "Artist Name",
    score: 0,
    up: 0,
    down: 0,
    followers: 0
  }

  render = () => {
    const { image, score, name, up, down, followers } = this.props
    return (
      <Segment as={Container} compact padded fluid basic>
        <Item.Group>
          <Item>
            <Item.Image>
              <Image
                verticalAlign="middle"
                src={image || defaultImage}
                width={300}
                height={300}
              />
              <Button fluid color="orange" style={{ marginTop: "10px" }}>
                Follow
              </Button>
            </Item.Image>

            <Item.Content>
              <Item.Header as="h1">{name}</Item.Header>

              <Item.Description>
                <Table basic="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Score</Table.Cell>
                      <Table.Cell>{score}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Up</Table.Cell>
                      <Table.Cell>{up}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Down</Table.Cell>
                      <Table.Cell>{down}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Followers</Table.Cell>
                      <Table.Cell>{followers.length}</Table.Cell>
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
