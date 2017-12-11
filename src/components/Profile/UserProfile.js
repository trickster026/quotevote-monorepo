import React, { PureComponent } from "react"
import {
  Image,
  Button,
  Segment,
  Container,
  Item,
  Table
} from "semantic-ui-react"
import { string, number, shape } from "prop-types"

class UserProfile extends PureComponent {
  static propTypes = {
    user: shape({
      name: string,
      points: number,
      vote_cast: number,
      image: string,
      followers: number,
      following: number
    })
  }

  static defaultProps = {
    user: {
      name: "John Doe",
      points: 59,
      vote_cast: 24,
      image:
        "https://www.digitalwallonia.be/wp-content/plugins/evenement/src/front/assets/img//contact-default.png",
      followers: 3853,
      following: 13254
    }
  }

  render = () => {
    const { user } = this.props
    return (
      <Segment as={Container} compact padded fluid>
        <Item.Group>
          <Item>
            <Item.Image>
              <Image src={user.image} width={300} height={300} />
              <Button fluid color="orange" style={{ marginTop: "10px" }}>
                Follow
              </Button>
            </Item.Image>

            <Item.Content>
              <Item.Header as="h1">{user.name}</Item.Header>

              <Item.Description>
                <Table basic="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Points</Table.Cell>
                      <Table.Cell>{user.points}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Vote Cast</Table.Cell>
                      <Table.Cell>{user.vote_cast}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Followers</Table.Cell>
                      <Table.Cell>{user.followers}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Following</Table.Cell>
                      <Table.Cell>{user.following}</Table.Cell>
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

export default UserProfile
