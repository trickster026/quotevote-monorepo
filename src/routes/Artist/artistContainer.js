import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose, withApollo } from "react-apollo"
import { GET_ARTIST_INFO, GET_TRACKS } from "../../graphql/queries"
import { songScores } from "../../actions/creators/songActionCreator"
import Artist from "../Artist/Artist"

class artistContainer extends PureComponent {
  state = { artist: {} }

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
      props: ({ data: { artist } }) => {
        if (artist) {
          const {
            downvotes,
            followers,
            name,
            total_score,
            upvotes,
            image_url
          } = artist
          return {
            downvotes,
            followers,
            name,
            score: total_score,
            image: image_url,
            upvotes
          }
        }
      }
    })
  )(artistContainer)
)
