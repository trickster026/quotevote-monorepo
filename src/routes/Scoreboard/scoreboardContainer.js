import React, { PureComponent } from "react"
import { graphql, compose } from "react-apollo"
import gql from "graphql-tag"

import Scoreboard from "./Scoreboard"
import { APP_TOKEN } from "../../utils/constants"

const GET_TOP_USERS = gql`
  query topUsers {
    topUsers(limit: 5)
  }
`

const GET_TOP_ARTISTS = gql`
  query getTopArtists {
    topArtists(limit: 5)
  }
`

class ScoreboardContainer extends PureComponent {
  render = () => {
    return (
      <Scoreboard
        topUsers={this.props.topUsers}
        topArtists={this.props.topArtists}
        loading={this.props.loading}
      />
    )
  }
}

export default compose(
  graphql(GET_TOP_USERS, {
    options: ownProps => ({
      context: { token: APP_TOKEN }
    }),
    props: ({ data: { topUsers, loading } }) => {
      if (topUsers && topUsers.length > 0) {
        const newTopUsers = topUsers.map(user => ({
          score: user.score,
          name: user.user
        }))
        return { topUsers: newTopUsers }
      }
      return { loading }
    }
  }),
  graphql(GET_TOP_ARTISTS, {
    options: ownProps => ({
      context: { token: APP_TOKEN }
    }),
    props: ({ data: { topArtists, loading } }) => {
      if (topArtists && topArtists.length > 0) {
        const newTopArtists = topArtists.map(user => ({
          score: user.totalScore,
          name: user.artistName
        }))
        return { topArtists: newTopArtists }
      }
      return { loading }
    }
  })
)(ScoreboardContainer)
