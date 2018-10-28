import React, { Component } from "react"
import { Container, Grid, Segment } from "semantic-ui-react"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import gql from "graphql-tag"
import UserText from "../../components/UserText/UserText"
import VoteHistory from "../../components/VoteHistory/VoteHistory"
import QuoteWall from "../../components/QuoteWall/QuoteWall"
import ProfileHeader from "../../components/UserProfile/ProfileHeader"
import UserPlaceHolder from "../../components/UserProfile/UserPlaceHolder/UserPlaceHolder"
import "./User.css"

const query = gql`
  query user($userId: String!, $creatorId: String!) {
    user(user_id: $userId) {
      avatar
      name
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
    }
    contents(creatorId: $creatorId) {
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
`

class User extends Component {
  static defaultProps = {
    userId: "none"
  }

  render = () => {
    return (
      <Query
        query={query}
        variables={{
          userId: this.props.userId,
          creatorId: this.props.creatorId
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <UserPlaceHolder />
          if (error) return <div>Error: {error.message}</div>

          const { user, contents } = data
          const contentTitles = contents.map(content => ({
            text: content.title,
            key: content.title,
            value: content._id,
            domain: content.domain.key
          }))

          return (
            <Segment as={Container} basic>
              <div className="profile-content">
                <ProfileHeader user={user} />
                <Grid contained>
                  <Grid.Row columns={2}>
                    <Grid.Column floated="left" width={6}>
                      <VoteHistory history={user.history} loading={false} />
                    </Grid.Column>
                    <Grid.Column floated="right" width={10}>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column>
                            <UserText texts={contentTitles} />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column>
                            <QuoteWall quotes={user.quotes} />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Segment>
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
