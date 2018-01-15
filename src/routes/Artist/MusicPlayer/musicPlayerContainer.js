import React, { PureComponent } from "react"
import { graphql, compose } from "react-apollo"
import MusicPlayer from "./MusicPlayer"
import {
  GET_SCORE,
  GET_UPVOTES_PER_SONG,
  GET_DOWNVOTES_PER_SONG
} from "../../../graphql/queries"

class MusicPlayerContainer extends PureComponent {
  render = () => {
    return <MusicPlayer {...this.props} />
  }
}

export default compose(
  graphql(GET_SCORE, {
    options: ownProps => ({
      variables: { id: ownProps.songId }
    }),
    props: ({ data: { scoreBySong } }) => {
      return { score: scoreBySong }
    }
  }),
  graphql(GET_UPVOTES_PER_SONG, {
    options: ownProps => ({
      variables: { song_id: ownProps.songId }
    }),
    props: ({ data: { upvotes } }) => ({ upvotes })
  }),
  graphql(GET_DOWNVOTES_PER_SONG, {
    options: ownProps => ({
      variables: { song_id: ownProps.songId }
    }),
    props: ({ data: { downvotes } }) => ({ downvotes })
  })
)(MusicPlayerContainer)
