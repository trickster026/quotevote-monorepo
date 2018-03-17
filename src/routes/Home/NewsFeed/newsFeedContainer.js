import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { graphql, compose } from "react-apollo"
import { GET_NEWS_FEED } from "../../../graphql/queries"
import NewsFeed from "./NewsFeed"
import { APP_TOKEN } from "../../../utils/constants"

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
        context: { token: APP_TOKEN }
      }),
      props: ({ data: { activities, loading } }) => ({
        activities
      })
    })
  )(NewsFeedContainer)
)
