import React, { PureComponent } from "react"
import { graphql } from "react-apollo"
import MusicPlayer from "./MusicPlayer"
import { GET_VOTE } from "../../../graphql/queries"

class MusicPlayerContainer extends PureComponent {
  componentWillReceiveProps = nextProps => {
    console.log("music player", nextProps)
  }

  render = () => {
    return <MusicPlayer {...this.props} />
  }
}

export default graphql(GET_VOTE, {
  options: ownProps => ({
    variables: { id: "5a37a486c27953edc3c34748" }
  }),
  props: ({ data: { vote } }) => {
    if (vote && vote.score) {
      return { score: vote.score }
    }
  }
})(MusicPlayerContainer)
