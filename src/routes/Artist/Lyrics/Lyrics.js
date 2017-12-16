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
import { string } from "prop-types"

class Lyrics extends PureComponent {
  state = { loading: true, highlightedWords: "" }

  static propTypes = {
    lyrics: string
  }

  static defaultProps = {
    lyrics: []
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.lyrics && nextProps.lyrics.length > 0) {
      this.setState({ loading: false })
    }
  }

  handleHighlight = event => {
    console.log("window", window.getSelection().toString())

    this.setState({ highlightedWords: window.getSelection().toString() })
  }

  renderVotingButtons = () => (
    <div>
      <Button color="green" inverted icon="plus" />
      <Button color="white" inverted icon="circle" />
      <Button color="red" inverted icon="minus" />
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
                    content={this.renderVotingButtons()}
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
