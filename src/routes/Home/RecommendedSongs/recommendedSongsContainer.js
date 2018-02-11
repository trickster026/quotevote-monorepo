import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import { GET_RECOMMENDED_SONGS } from "../../../graphql/queries"
import RecommendedSongs from "./RecommendedSongs"

class RecommendedSongsContainer extends PureComponent {
  render = () => {
    return <RecommendedSongs {...this.props} />
  }
}

export default graphql(GET_RECOMMENDED_SONGS, {
  options: ownProps => ({
    variables: { limit: 5 }
  }),
  props: ({ data: { recommendedSongs, loading } }) => ({
    songs: recommendedSongs
  })
})(RecommendedSongsContainer)
