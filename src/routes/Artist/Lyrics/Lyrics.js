import React, { PureComponent } from "react"
import {
  Segment,
  Popup,
  Header,
  Dimmer,
  Loader,
  Container,
  Button
} from "semantic-ui-react"
import { string, number } from "prop-types"

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
    console.log("nextprops", nextProps)
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

  handleHighlight = event => {
    this.setState({
      highlightedWords: window
        .getSelection()
        .toString()
        .trim()
    })
  }

  handleVoting = event => {
    this.setState(
      prevState => ({
        hasVoted: true,
        points: prevState.points + prevState.highlightedWords.split(" ").length
      }),
      () => {
        ;(async () => {
          await this.props.updateVote({
            mutation: this.props.mutation,
            variables: {
              vote: {
                id: "5a37a486c27953edc3c34748",
                song_id: "5a37a486c27953edc3c34748",
                user_id: "5a37a486c27953edc3c34748",
                start_index: 5,
                end_index: 10,
                is_upvote: true,
                tokens: 5,
                phrase: this.state.highlightedWords
              }
            }
          })
        })()
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
      <Button inverted icon="circle" onClick={this.handleVoting} />
      <Button color="red" inverted icon="minus" onClick={this.handleVoting} />
    </div>
  )

  renderLoading = () => {
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
      let formattedLyrics = lyrics.split("\n")

      formattedLyrics = formattedLyrics.map((line, index) => (
        <div key={index}>
          {line &&
            line.split(/\s/g).map((word, lineIndex) => {
              if (this.state.highlightedWords.length > 0) {
                return (
                  <Popup
                    size="mini"
                    inverted
                    hoverable
                    key={lineIndex}
                    trigger={<span>{` ${word} `}</span>}
                    content={
                      this.state.hasVoted
                        ? this.renderScoreAndQuotes()
                        : this.renderVotingButtons()
                    }
                  />
                )
              }
              return <span key={lineIndex}>{` ${word} `}</span>
            })}
          <br />
        </div>
      ))
      return (
        <Segment attached>
          <Container text>{formattedLyrics}</Container>
        </Segment>
      )
    }
  }

  render = () => {
    return (
      <div onMouseUp={this.handleHighlight} onMouseDown={this.handleHighlight}>
        <Header inverted attached="top" as="h4">
          Lyrics
        </Header>
        {this.renderLoading()}
      </div>
    )
  }
}

export default Lyrics
