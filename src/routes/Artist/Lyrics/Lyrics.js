import React, { PureComponent } from "react"
import { ToastContainer, toast } from "react-toastify"

import ActionPopup from "../../../components/VotingBoard/ActionPopup"
import VotingBoard from "../../../components/VotingBoard/VotingBoard"
import { string, number, func, array } from "prop-types"

class Lyrics extends PureComponent {
  state = {
    loading: true,
    highlightedWords: "",
    hasVoted: false,
    points: 0,
    isUpvote: true
  }

  static propTypes = {
    lyrics: string,
    score: number,
    upvotes: number,
    downvotes: number,
    onVoting: func,
    songId: number,
    artistId: number,
    quotes: array
  }

  static defaultProps = {
    lyrics: "",
    score: 0,
    upvotes: 0,
    downvotes: 0
  }

  componentWillReceiveProps = ({ lyrics, points }) => {
    if (lyrics && lyrics.length > 0) {
      this.setState({ loading: false })
    }

    if (points) {
      this.setState({ points })
    }
  }

  componentDidMount = () => {
    this.setState({
      hasVoted: localStorage.getItem("hhsb.voted")
    })
  }

  handleVoting = (event, vote) => {
    const { name } = event.currentTarget
    const isUpvote = vote.type === "upvote"

    if (name) {
      let points = isUpvote ? vote.points : -1 * vote.points

      this.setState({
        hasVoted: true,
        points,
        isUpvote
      })

      // localStorage.setItem("hhsb.voted", true)

      const { score, upvotes, downvotes, artistId, userId, songId } = this.props
      let totalUpvotes = isUpvote ? upvotes + 1 : upvotes
      let totalDownvotes = !isUpvote ? downvotes + 1 : downvotes

      this.props.updateSong({
        currentSongScore: score + points,
        currentSongUpvotes: totalUpvotes,
        currentSongDownvotes: totalDownvotes
      })
      this.props.onVoting({
        song_id: songId,
        user_id: userId,
        artist_id: artistId,
        start_index: this.state.startIndex,
        end_index: this.state.endIndex,
        is_upvote: isUpvote
      })
    }
  }

  handleSelect = selection => {
    const text = selection.text
    const startIndex = selection.startIndex
    const endIndex = selection.endIndex

    this.setState(prev => ({
      hasVoted: false,
      startIndex,
      endIndex,
      showPopover: true,
      highlightedWords: text
    }))
  }

  handleDeselect = () => {
    this.setState({ showPopover: false })
  }

  handleShareQuote = (event, quote) => {
    this.props.onShare({
      quotes: [quote, ...this.props.quotes]
    })
  }

  handleAddComment = (event, comment) => {
    this.setState({ comment }, async () => {
      if (this.state.comment.length > 0) {
        const finder = item => {
          return item[0] === "#"
        }
        const hashtag = this.state.comment.split(/\s+/g).find(finder)
        await this.props.onComment({
          content: this.state.comment,
          startIndex: this.state.startIndex,
          endIndex: this.state.endIndex,
          userId: this.props.userId,
          songId: this.props.songId,
          artistId: this.props.artistId,
          hashtag
        })

        toast.success("Comment Submitted")
      }
    })
  }

  render = () => {
    return (
      <div>
        <VotingBoard
          title="Lyrics"
          content={this.props.lyrics}
          onSelect={this.handleSelect}
        >
          {({ text }) => (
            <ActionPopup
              text={text}
              onVote={this.handleVoting}
              onAddComment={this.handleAddComment}
              onShareQuote={this.handleShareQuote}
            />
          )}
        </VotingBoard>
        <ToastContainer position="top-left" autoClose={2000} closeOnClick />
      </div>
    )
  }
}

export default Lyrics
