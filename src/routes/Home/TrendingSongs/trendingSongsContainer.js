import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import { GET_TRENDING_SONGS } from "../../../graphql/queries"
import TrendingSongs from "./TrendingSongs"

class TrendingSongsContainer extends PureComponent {
  render = () => {
    return <TrendingSongs {...this.props} />
  }
}

export default graphql(GET_TRENDING_SONGS, {
  options: ownProps => ({
    variables: { limit: 5 }
  }),
  props: ({ data: { trendingSongs, loading } }) => ({
    songs: trendingSongs
  })
})(TrendingSongsContainer)
