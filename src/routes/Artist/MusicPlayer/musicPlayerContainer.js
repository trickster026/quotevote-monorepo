import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import MusicPlayer from "./MusicPlayer"
import { GET_SCORE } from "../../../graphql/queries"

class MusicPlayerContainer extends PureComponent {
  render = () => {
    return <MusicPlayer {...this.props} />
  }
}

export default graphql(GET_SCORE, {
  options: ownProps => ({
    variables: { id: ownProps.songId }
  }),
  props: ({ data: { scoreBySong } }) => {
    return { score: scoreBySong }
  }
})(MusicPlayerContainer)
