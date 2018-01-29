import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { withApollo, graphql, compose } from "react-apollo"
import Lyrics from "./Lyrics"
import {
  GET_SONG,
  GET_ARTIST_INFO,
  GET_TOP_ARTISTS
} from "../../../graphql/queries"
import { CREATE_VOTE } from "../../../graphql/mutations"
import PropTypes from "prop-types"
class LyricsContainer extends PureComponent {
  state = { lyrics: "" }

  static propTypes = {
    songId: PropTypes.number.isRequired
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
            },
            {
              query: GET_TOP_ARTISTS
            },
            {
              query: GET_SONG,
              variables: { song_id: this.props.songId }
            }
          ]
        })
      }
    }
  }

  render = () => {
    const { client, ...others } = this.props
    return (
      <Lyrics
        {...others}
        lyrics={this.props.lyrics}
        onVoting={this.mutation()}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateSong: song => {
    dispatch({ type: "UPDATE_CURRENT_SONG", payload: song })
  }
})

export default withApollo(
  compose(
    connect(null, mapDispatchToProps),
    graphql(GET_SONG, {
      options: ({ songId }) => ({ variables: { song_id: songId } }),
      props: ({ data: { song } }) => {
        if (song) {
          return {
            lyrics: song.lyrics,
            score: song.total_score,
            upvotes: song.upvotes,
            downvotes: song.downvotes
          }
        }
      }
    })
  )(LyricsContainer)
)
