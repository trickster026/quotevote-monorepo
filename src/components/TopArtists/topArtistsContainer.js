import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import TopArtists from "./TopArtists"
import { GET_TOP_ARTISTS } from "../../graphql/queries"
import PropTypes from "prop-types"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYnJvbkBlbWFpbC5jb20iLCJfaWQiOiI1OWIwMDM3NTBlMzc2NjA0MTQ0MDE3MWYiLCJpYXQiOjE1MTI5OTYwNzh9.MhDHKSGYU2F8fpeWxOT7b4jimD9-N4FwBZe4z-OT4YE"

class TopArtistsContainer extends PureComponent {
  static propTypes = {
    topArtists: PropTypes.array
  }

  render = () => {
    return <TopArtists artists={this.props.topArtists} />
  }
}

export default graphql(GET_TOP_ARTISTS, {
  options: ownProps => ({
    context: { token }
  }),
  props: ({ data: { topArtists } }) => ({ topArtists })
})(TopArtistsContainer)
