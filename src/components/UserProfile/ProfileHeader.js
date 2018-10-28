import React from "react"
import { Grid, Image, Search, Button, Container } from "semantic-ui-react"
import faker from "faker"
import "./ProfileHeader.css"

function ProfileHeader(props) {
  const { user } = props
  const scoreValues = `Score ${user.scoreDetails.upvotes -
    user.scoreDetails.downvotes} (${user.scoreDetails.upvotes} / -${
    user.scoreDetails.downvotes
  })`
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
        <Button basic color="green">
          POSTED CONTENT
        </Button>
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
