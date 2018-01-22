import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose, withApollo } from "react-apollo"
import { GET_ARTIST_INFO, GET_TRACKS } from "../../graphql/queries"
import { songScores } from "../../actions/creators/songActionCreator"
import Artist from "../Artist/Artist"

class artistContainer extends PureComponent {
  state = { artist: {} }

  componentWillReceiveProps = async nextProps => {
    console.log("component updated")
    if (nextProps.artist) {
      const _artist = nextProps.artist
      const artist = {
        name: _artist.name,
        score: 0,
        up: 0,
        down: 0,
        followers: _artist.followers_count,
        image: _artist.image_url
      }
      this.setState({ artist })
    }

    if (nextProps.songId) {
      this.props.dispatch(songScores(nextProps.songId))
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
      props: ({ data: { artist }, ownProps: { client } }) => ({
        artist: artist && artist.response,
        query: client.query
      })
    })
  )(artistContainer)
)
