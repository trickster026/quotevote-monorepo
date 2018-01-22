import React, { PureComponent } from "react"
import {
  Segment,
  Label,
  Header,
  Dimmer,
  Loader,
  Container,
  Button
} from "semantic-ui-react"
import { string } from "prop-types"
import SelectionPopover from "./SelectionPopover"
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
    lyrics: string
  }

  static defaultProps = {
    lyrics: ""
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

  handleVoting = event => {
    const { name } = event.currentTarget
    if (name) {
      const isUpvote = name === "upvote"
      console.log("is upvote", isUpvote)
      let points = this.state.highlightedWords.split(/\s+/g).length
      points = isUpvote ? points : -1 * points

      this.setState({
        hasVoted: true,
        points,
        isUpvote
      })

      // localStorage.setItem("hhsb.voted", true)

      const { score, upvotes, downvotes, updateSong, onVoting } = this.props
      let totalUpvotes = isUpvote ? upvotes + 1 : upvotes
      let totalDownvotes = !isUpvote ? downvotes + 1 : downvotes
      updateSong({
        currentSongScore: score + points,
        currentSongUpvotes: totalUpvotes,
        currentSongDownvotes: totalDownvotes
      })

      onVoting({
        song_id: this.props.songId,
        user_id: "5a37a486c27953edc3c34748",
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

    this.setState({
      startIndex,
      endIndex,
      showPopover: true,
      highlightedWords: text
    })
  }

  renderScoreAndQuotes = () => (
    <div>
      <Button inverted>{`${this.state.points}`}</Button>
      <Button icon="quote right" inverted />
    </div>
  )

  renderVotingButtons = () => (
    <div>
      <Button
        color="green"
        inverted
        icon="plus"
        name="upvote"
        onClick={this.handleVoting}
      />
      <Button inverted icon="circle" />
      <Button
        color="red"
        inverted
        icon="minus"
        name="downvote"
        onClick={this.handleVoting}
      />
    </div>
  )

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
                onDeselect={() => {
                  this.setState({ showPopover: false })
                }}
              >
                <Label pointing="below" color="black">
                  {this.state.hasVoted
                    ? this.renderScoreAndQuotes()
                    : this.renderVotingButtons()}
                </Label>
              </SelectionPopover>
            </div>
          </Container>
        </Segment>
      )
    }
  }

  render = () => {
    return (
      <div className="lyrics-selection">
        <Header inverted attached="top" as="h4">
          Lyrics
        </Header>
        {this.renderMain()}
      </div>
    )
  }
}

export default Lyrics
