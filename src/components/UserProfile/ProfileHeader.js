import React from "react"
import {
  Grid,
  Image,
  Search,
  Button,
  Container,
  Modal
} from "semantic-ui-react"
import faker from "faker"
import "./ProfileHeader.css"
import UserText from "../UserText/UserText"

function ProfileHeader(props) {
  const { user, texts } = props
  let scoreValues = "Score 8 (10 / -2)"
  if (user) {
    scoreValues = `Score ${user.scoreDetails.upvotes -
      user.scoreDetails.downvotes} (${user.scoreDetails.upvotes} / -${
      user.scoreDetails.downvotes
    })`
  }

  return (
    <div>
      <Grid columns={16} className="profile-header">
        <Grid.Row columns={3}>
          <Grid.Column floated="left" verticalAlign="bottom" stretched>
            <div className="profile-card">
              <Image
                src={!user ? faker.internet.avatar() : user.avatar}
                size="small"
                circular
                floated="left"
              />
              <h2>
                {!user
                  ? `${faker.name.firstName()} ${faker.name.lastName()}`
                  : user.name}
              </h2>
              <p>{scoreValues}</p>
            </div>
          </Grid.Column>
          <Grid.Column floated="right" verticalAlign="bottom" textAlign="right">
            <Search />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container className="button-group" textAlign="center">
        <Button basic>INFO</Button>

        <Modal
          trigger={
            <Button basic color="green">
              POSTED CONTENT
            </Button>
          }
        >
          <Modal.Header>Posted Contents</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <UserText texts={texts} />
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Button basic color="teal">
          SEND MESSAGE
        </Button>
        <Button basic color="red">
          REPORT
        </Button>
        <Button color="twitter">FOLLOW</Button>
      </Container>
    </div>
  )
}

export default ProfileHeader
