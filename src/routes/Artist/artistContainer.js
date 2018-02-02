import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose, withApollo } from "react-apollo"
import { GET_TRACKS } from "../../graphql/queries"
import { songScores } from "../../actions/creators/songActionCreator"
import Artist from "../Artist/Artist"
import PropTypes from "prop-types"

class artistContainer extends PureComponent {
  state = { artist: {} }

  static propTypes = {
    albums: PropTypes.array,
    songId: PropTypes.number,
    loading: PropTypes.bool
  }

  componentWillReceiveProps = async nextProps => {
    if (nextProps.score) {
      const artist = {
        name: nextProps.name,
        score: nextProps.score,
        up: nextProps.upvotes,
        down: nextProps.downvotes,
        followers: nextProps.followers,
        image: nextProps.image
      }
      this.setState({ artist })
    }

    if (nextProps.songId) {
      this.props.dispatch(songScores(nextProps.songId))
      this.props.dispatch({
        type: "UPDATE_CURRENT_SONG",
        payload: {
          currentArtist: this.props.match.params.artistId * 1,
          currentArtistName: this.props.name
        }
      })
    }
  }

  render = () => {
    return (
      <Artist
        albums={this.props.albums}
        songId={this.props.songId}
        loading={this.props.loading}
        artistId={this.props.match.params.artistId * 1}
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
        data: { albumsByArtist, loading },
        ownProps: { updateSong, currentSongId }
      }) => {
        let firstSongId
        if (albumsByArtist && albumsByArtist[0]) {
          firstSongId = currentSongId || albumsByArtist[0].firstSong
        }
        return {
          albums: albumsByArtist,
          songId: firstSongId,
          loading
        }
      }
    })
  )(artistContainer)
)
