import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { graphql, compose } from "react-apollo"
import { GET_NEWS_FEED } from "../../../graphql/queries"
import NewsFeed from "./NewsFeed"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYnJvbkBlbWFpbC5jb20iLCJfaWQiOiI1OWIwMDM3NTBlMzc2NjA0MTQ0MDE3MWYiLCJpYXQiOjE1MTI5OTYwNzh9.MhDHKSGYU2F8fpeWxOT7b4jimD9-N4FwBZe4z-OT4YE"

class NewsFeedContainer extends PureComponent {
  render = () => {
    return <NewsFeed {...this.props} />
  }
}

const mapDispatchToProps = dispatch => ({
  select: (artistId, songId) => {
    dispatch({
      type: "UPDATE_CURRENT_SONG",
      payload: {
        currentArtist: artistId,
        currentSongId: songId
      }
    })
  }
})

export default withRouter(
  compose(
    connect(null, mapDispatchToProps),
    graphql(GET_NEWS_FEED, {
      options: ownProps => ({
        variables: { limit: 5 },
        context: { token }
      }),
      props: ({ data: { activities, loading } }) => ({
        activities
      })
    })
  )(NewsFeedContainer)
)
