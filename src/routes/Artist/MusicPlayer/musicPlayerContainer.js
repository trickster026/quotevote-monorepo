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
    currentSongDownvotes,
    currentArtistName,
    currentSongTitle
  } = state.artist
  return {
    score: currentSongScore,
    upvotes: currentSongUpvotes,
    downvotes: currentSongDownvotes,
    artistName: currentArtistName,
    songTitle: currentSongTitle
  }
}

export default connect(mapStateToProps)(MusicPlayerContainer)
