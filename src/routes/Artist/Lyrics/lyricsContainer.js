import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { graphql, compose, withApollo } from "react-apollo"
import Lyrics from "./Lyrics"
import { GET_SONG } from "../../../graphql/queries"
import { UPDATE_VOTE } from "../../../graphql/mutations"
class LyricsContainer extends PureComponent {
  render = () => {
    let mutation
    if (this.props.client) {
      mutation = () => {
        return async payload => {
          return await this.props.client.mutate({
            mutation: UPDATE_VOTE,
            variables: { vote: payload }
          })
        }
      }
    }

    return (
      <div>
        <Lyrics
          lyrics={this.props.lyrics}
          updateVote={mutation()}
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
    })
  )(LyricsContainer)
)
