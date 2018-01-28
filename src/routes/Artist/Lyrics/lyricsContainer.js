import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withApollo } from "react-apollo"
import Lyrics from "./Lyrics"
import { GET_SONG, GET_ARTIST_INFO } from "../../../graphql/queries"
import { CREATE_VOTE } from "../../../graphql/mutations"
import PropTypes from "prop-types"
class LyricsContainer extends PureComponent {
  state = { lyrics: "" }

  static propTypes = {
    songId: PropTypes.number.isRequired
  }

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
          variables: { vote: payload },
          refetchQueries: [
            {
              query: GET_ARTIST_INFO,
              variables: { artist_id: this.props.artistId }
            }
          ]
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
        this.props.updateSong({ currentSongTitle: song.title })
        return song.lyrics
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
    currentArtist,
    currentSongId
  } = state.artist
  return {
    score: currentSongScore,
    upvotes: currentSongUpvotes,
    downvotes: currentSongDownvotes,
    artistId: currentArtist,
    songId: currentSongId
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
