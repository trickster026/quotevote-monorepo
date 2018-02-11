import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { graphql, compose } from "react-apollo"
import { GET_TRENDING_SONGS } from "../../../graphql/queries"
import TrendingSongs from "./TrendingSongs"

class TrendingSongsContainer extends PureComponent {
  render = () => {
    return <TrendingSongs {...this.props} />
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
    graphql(GET_TRENDING_SONGS, {
      options: ownProps => ({
        variables: { limit: 5 }
      }),
      props: ({ data: { trendingSongs, loading } }) => ({
        songs: trendingSongs
      })
    })
  )(TrendingSongsContainer)
)
