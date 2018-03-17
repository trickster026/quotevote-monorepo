import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { graphql, compose } from "react-apollo"
import { GET_RECOMMENDED_SONGS } from "../../../graphql/queries"
import RecommendedSongs from "./RecommendedSongs"
import { APP_TOKEN } from "../../../utils/constants"

class RecommendedSongsContainer extends PureComponent {
  render = () => {
    return <RecommendedSongs {...this.props} />
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
    graphql(GET_RECOMMENDED_SONGS, {
      options: ownProps => ({
        variables: { limit: 5 },
        context: { token: APP_TOKEN }
      }),
      props: ({ data: { recommendedSongs, loading } }) => ({
        songs: recommendedSongs
      })
    })
  )(RecommendedSongsContainer)
)
