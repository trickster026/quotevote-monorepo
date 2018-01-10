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
import { string, number } from "prop-types"
import SelectionPopover from "./SelectionPopover"
import "./Lyrics.css"

class Lyrics extends PureComponent {
  state = { loading: true, highlightedWords: "", hasVoted: false, points: 0 }

  static propTypes = {
    lyrics: string,
    songScore: number
  }

  static defaultProps = {
    lyrics: "",
    songScore: 0
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.lyrics && nextProps.lyrics.length > 0) {
      this.setState({ loading: false })
    }

    if (nextProps.songScore) {
      this.setState({ songScore: nextProps.songScore })
    }

    if (nextProps.points) {
      this.setState({ points: nextProps.points })
    }
  }

  handleVoting = event => {
    this.setState(
      prevState => ({
        hasVoted: true,
        points: prevState.highlightedWords.split(" ").length
      }),
      () => {
        this.props.updateVote({
          id: "5a37a486c27953edc3c34748",
          song_id: "5a37a486c27953edc3c34748",
          user_id: "5a37a486c27953edc3c34748",
          start_index: 5,
          end_index: 10,
          is_upvote: true,
          tokens: 5,
          phrase: this.state.highlightedWords
        })
      }
    )
  }

  renderScoreAndQuotes = () => (
    <div>
      <Button inverted>{`+ ${this.state.points}`}</Button>
      <Button icon="quote right" inverted />
    </div>
  )

  renderVotingButtons = () => (
    <div>
      <Button color="green" inverted icon="plus" onClick={this.handleVoting} />
      <Button inverted icon="circle" />
      <Button color="red" inverted icon="minus" onClick={this.handleVoting} />
    </div>
  )

  renderMain = () => {
    const { lyrics } = this.props

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
                <p className="lyrics-segment">{lyrics}</p>
              </div>
              <SelectionPopover
                showPopover={this.state.showPopover}
                topOffset={60}
                onSelect={selection => {
                  this.setState({
                    showPopover: true,
                    highlightedWords: selection
                  })
                }}
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
