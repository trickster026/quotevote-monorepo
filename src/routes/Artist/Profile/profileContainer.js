import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import { GET_ARTIST_INFO } from "../../../graphql/queries"
import Profile from "./Profile"

class ProfileContainer extends PureComponent {
  render = () => {
    return <Profile {...this.props} />
  }
}

export default graphql(GET_ARTIST_INFO, {
  options: ({ artistId }) => ({ variables: { artist_id: artistId } }),
  props: ({ data: { artist } }) => {
    if (artist) {
      return {
        name: artist.name,
        score: artist.total_score,
        up: artist.upvotes,
        down: artist.downvotes,
        followers: artist.followers,
        image: artist.image_url
      }
    }
  }
})(ProfileContainer)
