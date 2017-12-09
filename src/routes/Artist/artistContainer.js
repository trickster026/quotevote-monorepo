import React, { PureComponent } from "react"
import { graphql, compose } from "react-apollo"
import { GET_ARTIST_INFO, GET_TRACKS } from "../../graphql/queries"
import Artist from "../Artist/Artist"

class artistContainer extends PureComponent {
  state = { artist: {} }

  componentWillReceiveProps = nextProps => {
    console.log("received props", nextProps)
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

  render = () => {
    return (
      <div>
        <Artist artist={this.state.artist} albums={this.props.albums} />
      </div>
    )
  }
}

export default compose(
  graphql(GET_TRACKS, {
    options: ownProps => {
      const artistId = ownProps && ownProps.match.params.artistId * 1
      return {
        variables: {
          artist_id: artistId
        }
      }
    },
    props: ({ data: { albumsByArtist } }) => ({
      albums: albumsByArtist
    })
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
  })
)(artistContainer)
