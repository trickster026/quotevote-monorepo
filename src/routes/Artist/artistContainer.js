import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose, withApollo } from "react-apollo"
import {
  GET_ARTIST_INFO,
  GET_TRACKS,
  GET_ARTIST_SCORE
} from "../../graphql/queries"
import { songScores } from "../../actions/creators/songActionCreator"
import Artist from "../Artist/Artist"

class artistContainer extends PureComponent {
  state = { artist: {} }

  componentWillReceiveProps = async nextProps => {
    if (nextProps.artist) {
      const _artist = nextProps.artist
      const artist = {
        name: _artist.name,
        score: nextProps.artistScores.score,
        up: nextProps.artistScores.upvotes,
        down: nextProps.artistScores.downvotes,
        followers: _artist.followers_count,
        image: _artist.image_url
      }
      this.setState({ artist })
    }

    if (nextProps.songId) {
      this.props.dispatch(songScores(nextProps.songId))
      this.props.dispatch({
        type: "UPDATE_CURRENT_SONG",
        payload: { currentArtist: this.props.match.params.artistId * 1 }
      })
    }
  }

  render = () => {
    return (
      <Artist
        artist={this.state.artist}
        albums={this.props.albums}
        currentSong={this.props.songId}
      />
    )
  }
}

const mapStateToProps = ({ artist }) => ({
  currentSongId: artist.currentSongId
})

export default withApollo(
  compose(
    connect(mapStateToProps),
    graphql(GET_TRACKS, {
      options: ownProps => {
        const artistId = ownProps && ownProps.match.params.artistId * 1
        return {
          variables: {
            artist_id: artistId
          }
        }
      },
      props: ({
        data: { albumsByArtist },
        ownProps: { updateSong, currentSongId }
      }) => {
        let firstSongId
        if (albumsByArtist && albumsByArtist[0]) {
          firstSongId = currentSongId || albumsByArtist[0].firstSong
        }
        return {
          albums: albumsByArtist,
          songId: firstSongId
        }
      }
    }),
    graphql(GET_ARTIST_INFO, {
      options: ownProps => {
        const artistId = ownProps && ownProps.match.params.artistId * 1
        return {
          variables: {
            artist_id: artistId
          }
        }
      },
      props: ({ data: { artist } }) => ({
        artist: artist && artist.response
      })
    }),
    graphql(GET_ARTIST_SCORE, {
      options: ownProps => ({
        variables: { id: ownProps && ownProps.match.params.artistId * 1 }
      }),
      props: ({ data: { score, upvotes, downvotes } }) => ({
        artistScores: { score, upvotes, downvotes }
      })
    })
  )(artistContainer)
)
