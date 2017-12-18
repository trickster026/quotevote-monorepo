import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose, withApollo } from "react-apollo"
import Lyrics from "./Lyrics"
import { GET_SONG, GET_VOTE } from "../../../graphql/queries"
import { UPDATE_VOTE } from "../../../graphql/mutations"
class LyricsContainer extends PureComponent {
  componentWillReceiveProps = nextProps => {
    console.log("nextprops", nextProps)
  }

  render = () => {
    let updateVote
    if (this.props.client) {
      updateVote = this.props.client.mutate
    }

    return (
      <div>
        <Lyrics
          lyrics={this.props.lyrics}
          updateVote={updateVote}
          mutation={UPDATE_VOTE}
          points={this.props.score}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state

export default withApollo(
  compose(
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
    }),
    graphql(GET_VOTE, {
      options: ownProps => ({
        variables: { id: "5a37a486c27953edc3c34748" }
      }),
      props: ({ data: { vote } }) => {
        if (vote && vote.score) {
          return { score: vote.score }
        }
      }
    })
  )(LyricsContainer)
)
