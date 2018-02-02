import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import TopArtists from "./TopArtists"
import { GET_TOP_ARTISTS } from "../../graphql/queries"
import PropTypes from "prop-types"

class TopArtistsContainer extends PureComponent {
  static propTypes = {
    topArtists: PropTypes.array
  }

  render = () => {
    return <TopArtists artists={this.props.topArtists} />
  }
}

export default graphql(GET_TOP_ARTISTS, {
  props: ({ data: { topArtists } }) => ({ topArtists })
})(TopArtistsContainer)
