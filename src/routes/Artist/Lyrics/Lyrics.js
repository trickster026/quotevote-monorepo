import React, { PureComponent } from "react"
import { Segment, Header, Dimmer, Loader, Container } from "semantic-ui-react"
import { string, number, func, array } from "prop-types"
import SelectionPopover from "./SelectionPopover"
import ActionPopup from "./ActionPopup"

import "./Lyrics.css"

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

  componentWillReceiveProps = nextProps => {
    if (nextProps.lyrics && nextProps.lyrics.length > 0) {
      this.setState({ loading: false })
    }

    if (nextProps.points) {
      this.setState({ points: nextProps.points })
    }
  }

  componentDidMount = () => {
    this.setState({
      hasVoted: localStorage.getItem("hhsb.voted")
    })
  }

  handleVoting = (event, isUpvote) => {
    const { name } = event.currentTarget
    if (name) {
      let points = this.state.highlightedWords.split(/\s+/g).length
      points = isUpvote ? points : -1 * points

      this.setState({
        hasVoted: true,
        points,
        isUpvote
      })

      // localStorage.setItem("hhsb.voted", true)

      const {
        score,
        upvotes,
        downvotes,
        updateSong,
        artistId,
        onVoting,
        userId,
        songId
      } = this.props
      let totalUpvotes = isUpvote ? upvotes + 1 : upvotes
      let totalDownvotes = !isUpvote ? downvotes + 1 : downvotes
      updateSong({
        currentSongScore: score + points,
        currentSongUpvotes: totalUpvotes,
        currentSongDownvotes: totalDownvotes
      })

      onVoting({
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
    const text = selection.toString()
    const startIndex = selection.anchorOffset
    const endIndex = startIndex + text.length

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

  handleShareQuote = event => {
    this.props.onShare({
      quotes: [this.state.highlightedWords, ...this.props.quotes]
    })
  }

  handleAddComment = (event, comment) => {
    this.setState({ comment }, () => {
      if (this.state.comment.length > 0) {
        const finder = item => {
          return item[0] === "#"
        }
        const hashtag = this.state.comment.split(/\s+/g).find(finder)
        this.props.onComment({
          content: this.state.comment,
          startIndex: this.state.startIndex,
          endIndex: this.state.endIndex,
          userId: this.props.userId,
          songId: this.props.songId,
          artistId: this.props.artistId,
          hashtag
        })
      }
    })
  }

  renderMain = () => {
    if (this.state.loading) {
      return (
        <Segment attached style={{ minHeight: "100px" }}>
          <Dimmer active>
            <Loader size="small">Loading Lyrics</Loader>
          </Dimmer>
        </Segment>
      )
    } else {
      if (this.props.lyrics) {
        return (
          <Segment attached>
            <Container text>
              <div style={{ position: "relative" }}>
                <div data-selectable>
                  <p className="lyrics-segment">{this.props.lyrics}</p>
                </div>
                <SelectionPopover
                  showPopover={this.state.showPopover}
                  topOffset={60}
                  onSelect={this.handleSelect}
                  onDeselect={this.handleDeselect}
                >
                  <ActionPopup
                    points={this.state.points}
                    show={this.state.showPopover}
                    onVote={this.handleVoting}
                    onShareQuote={this.handleShareQuote}
                    onAddComment={this.handleAddComment}
                  />
                </SelectionPopover>
              </div>
            </Container>
          </Segment>
        )
      } else {
        return (
          <Segment attached>
            <Header as="h3">
              <Header.Content>Select a song</Header.Content>
              <Header.Subheader>
                Click on song in the albums list in the left panel
              </Header.Subheader>
            </Header>
          </Segment>
        )
      }
    }
  }

  render = () => {
    return (
      <div className="lyrics-selection">
        <Header className="header-module" inverted attached="top" as="h4">
          Lyrics
        </Header>
        {this.renderMain()}
      </div>
    )
  }
}

export default Lyrics
