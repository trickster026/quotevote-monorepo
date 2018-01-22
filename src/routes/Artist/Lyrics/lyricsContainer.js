import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withApollo } from "react-apollo"
import Lyrics from "./Lyrics"
import { GET_SONG } from "../../../graphql/queries"
import { CREATE_VOTE } from "../../../graphql/mutations"
class LyricsContainer extends PureComponent {
  state = { lyrics: "" }

  componentWillReceiveProps = async nextProps => {
    if (nextProps.songId) {
      this.setState({
        lyrics: await this.lyrics()(nextProps.songId)
      })
    }
  }

  mutation = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.mutate({
          mutation: CREATE_VOTE,
          variables: { vote: payload }
        })
      }
    }
  }

  lyrics = () => {
    if (this.props.client) {
      return async songId => {
        const { song } = (await this.props.client.query({
          query: GET_SONG,
          variables: { song_id: songId }
        })).data

        return song.lyricist_data.lyrics
      }
    }
  }

  render = () => {
    const { client, ...others } = this.props
    return (
      <Lyrics
        {...others}
        lyrics={this.state.lyrics}
        onVoting={this.mutation()}
      />
    )
  }
}

const mapStateToProps = state => {
  const {
    currentSongScore,
    currentSongUpvotes,
    currentSongDownvotes,
    currentArtist
  } = state.artist
  return {
    score: currentSongScore,
    upvotes: currentSongUpvotes,
    downvotes: currentSongDownvotes,
    artistId: currentArtist
  }
}

const mapDispatchToProps = dispatch => ({
  updateSong: song => {
    dispatch({ type: "UPDATE_CURRENT_SONG", payload: song })
  }
})

export default withApollo(
  connect(mapStateToProps, mapDispatchToProps)(LyricsContainer)
)
