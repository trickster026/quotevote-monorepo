import React, { Component } from "react"
import { Segment, Grid, Container } from "semantic-ui-react"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import gql from "graphql-tag"

import CreatorPanel from "../../components/CreatorPanel/CreatorPanel"
import UserText from "../../components/UserText/UserText"
import VoteHistory from "../../components/VoteHistory/VoteHistory"
import QuoteWall from "../../components/QuoteWall/QuoteWall"

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
          if (loading) return <div>Loading...</div>
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
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <CreatorPanel
                      creator={user.name}
                      score={user.scoreDetails}
                      image={user.avatar}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <UserText texts={contentTitles} />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <VoteHistory history={user.history} />
                  </Grid.Column>
                  <Grid.Column>
                    <QuoteWall quotes={user.quotes} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
