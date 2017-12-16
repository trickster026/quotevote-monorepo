import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose } from "react-apollo"
import Lyrics from "./Lyrics"
import { GET_SONG } from "../../../graphql/queries"

class LyricsContainer extends PureComponent {
  componentWillReceiveProps = nextProps => {
    console.log("lyrics", nextProps)
  }

  render = () => {
    return (
      <div>
        <Lyrics lyrics={this.props.lyrics} />
      </div>
    )
  }
}

const mapStateToProps = state => state

export default compose(
  connect(mapStateToProps),
  graphql(GET_SONG, {
    options: ownProps => ({
      variables: { song_id: ownProps.songId }
    }),
    props: ({ data: { song } }) => {
      if (song && song.lyricist_data) {
        return { lyrics: song.lyricist_data.lyrics }
      }
    }
  })
)(LyricsContainer)
