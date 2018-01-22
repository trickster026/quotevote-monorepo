import React, { PureComponent } from "react"
import { connect } from "react-redux"
import MusicPlayer from "./MusicPlayer"

class MusicPlayerContainer extends PureComponent {
  render = () => {
    return <MusicPlayer {...this.props} />
  }
}

const mapStateToProps = state => {
  const {
    currentSongScore,
    currentSongUpvotes,
    currentSongDownvotes
  } = state.artist
  return {
    score: currentSongScore,
    upvotes: currentSongUpvotes,
    downvotes: currentSongDownvotes
  }
}

export default connect(mapStateToProps)(MusicPlayerContainer)
