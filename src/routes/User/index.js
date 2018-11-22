import React, { Component } from "react"
import { Container, Grid, Segment, Header, Divider } from "semantic-ui-react"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import gql from "graphql-tag"
import VoteHistory from "../../components/VoteHistory/VoteHistory"
import QuoteWall from "../../components/QuoteWall/QuoteWall"
import ProfileHeader from "../../components/UserProfile/ProfileHeader"
import UserPlaceHolder from "../../components/UserProfile/UserPlaceHolder/UserPlaceHolder"
import "./User.css"
import Followers from "../../components/Followers/Followers"
import UserText from "../../components/UserText/UserText"
import UserChat from "../../components/Chat/UserChat"

export const QUERY_USER_PROFILE = gql`
  query user($userId: String!) {
    user(user_id: $userId) {
      _id
      avatar
      name
      creator {
        _id
      }
      _followingId
      _followersId
      scoreDetails {
        upvotes
        downvotes
      }
      history
      quotes {
        quote
        content {
          title
        }
        creator {
          name
          profileImageUrl
        }
      }
      contents {
        _id
        domain {
          key
        }
        creator {
          name
        }
        title
        text
      }
    }
  }
`

const userRoomQuery = gql`
  query userChatRoom($userId: String!) {
    userChatRoom(userId: $userId) {
      _id
      users
      messageType
      created
    }
  }
`

class User extends Component {
  state = {
    userId: "",
    showChat: false
  }
  static defaultProps = {
    userId: "none"
  }

  handleShowChat = showChat => {
    this.setState({ showChat })
  }

  renderUserChat = name => {
    const { userId } = this.props.match.params // current user profile page
    const variable = { userId }
    return (
      <Query query={userRoomQuery} variables={variable}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading messages...</div>
          if (error) return <div>Error loading messages</div>
          const { _id } = data.userChatRoom
          return <UserChat messageRoomId={_id} {...this.props} name={name} />
        }}
      </Query>
    )
  }

  render = () => {
    const { userId } = this.props.match.params
    return (
      <Query
        query={QUERY_USER_PROFILE}
        variables={{
          userId: userId
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <UserPlaceHolder />
          if (error) return <div>Error: {error.message}</div>

          const { user } = data
          const { contents } = user
          const contentTitles = contents.map(content => ({
            text: content.title,
            key: content.title,
            value: content._id,
            domain: content.domain.key
          }))

          const hideUserPostedContents = this.props.userId !== user._id

          return (
            <React.Fragment>
              <Segment as={Container} basic>
                <div className="profile-content">
                  <ProfileHeader
                    user={user}
                    texts={contentTitles}
                    handleShowChat={this.handleShowChat}
                  />
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column floated="left" width={6}>
                        <VoteHistory history={user.history} loading={false} />
                      </Grid.Column>
                      <Grid.Column floated="right" width={10}>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column>
                              <Followers followedUsers={user._followingId} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <QuoteWall quotes={user.quotes} />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <Grid.Row
                          className={
                            hideUserPostedContents
                              ? "row-hidden"
                              : "row-visible"
                          }
                        >
                          <Grid.Column>
                            <Header
                              as="h1"
                              style={{
                                fontSize: 14,
                                paddingTop: 20,
                                paddingLeft: 10
                              }}
                            >
                              {" "}
                              Posted Contents{" "}
                            </Header>
                            <Divider />
                            <UserText texts={contentTitles} />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Segment>
              {this.state.showChat &&
                userId !== this.props.userId &&
                this.renderUserChat(user.name)}
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

const mapStateToProps = ({ login: { user } }) => ({
  userId: user._id,
  creatorId: user.creatorId
})

export default connect(mapStateToProps)(User)
