import React, { PureComponent } from "react"
import { Button, Card, Header, Segment } from "semantic-ui-react"
import moment from "moment"
import TimeAgo from "react-timeago"
import PropTypes from "prop-types"

class ManageInvites extends PureComponent {
  static propTypes = {
    userInviteRequests: PropTypes.array
  }

  getStatusColor = status => {
    switch (status) {
      case "NEW":
        return "orange"
      case "DECLINED":
        return "red"
      case "APPROVED":
        return "green"
      default:
        return "black"
    }
  }

  renderButtons = (status, userId) => {
    const { handleButtons } = this.props
    if ("NEW" === status) {
      return (
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              name="approve"
              basic
              color="green"
              onClick={e => handleButtons(userId, e)}
            >
              APPROVE
            </Button>
            <Button
              name="decline"
              basic
              color="red"
              onClick={e => handleButtons(userId, e)}
            >
              DECLINE
            </Button>
          </div>
        </Card.Content>
      )
    } else if ("APPROVED" === status) {
      return (
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              name="resend"
              basic
              color="green"
              onClick={e => handleButtons(userId, e)}
            >
              RESEND
            </Button>
          </div>
        </Card.Content>
      )
    }
  }

  renderUserInviteRequests = () => {
    const { userInviteRequests } = this.props

    if (userInviteRequests && userInviteRequests.length > 0) {
      return this.props.userInviteRequests.map((user, index) => (
        <Card key={index}>
          <Card.Content>
            <Card.Header>{user.email}</Card.Header>
            <Card.Meta>
              <TimeAgo date={moment(user.created)} />
            </Card.Meta>
            <Card.Description
              style={{ color: this.getStatusColor(user.status) }}
            >
              {user.status}
              <br />
            </Card.Description>
          </Card.Content>
          {this.renderButtons(user.status, user._id)}
        </Card>
      ))
    }
    return (
      <Header as="h4">
        <Header.Content>No user request invites :)</Header.Content>
      </Header>
    )
  }

  render = () => {
    return (
      <div>
        <Header className="header-module" inverted attached="top" as="h4">
          Manage User Request Invites
        </Header>
        <Segment attached textAlign="center">
          <Card.Group>{this.renderUserInviteRequests()}</Card.Group>
        </Segment>
      </div>
    )
  }
}

export default ManageInvites
