import React, { PureComponent } from "react"
import { cloneDeep } from "lodash"
import { graphql, compose } from "react-apollo"
import { connect } from "react-redux"
import { GET_VERSES } from "../../../graphql/queries"
import {
  Segment,
  Container,
  Header,
  Label,
  Button,
  Popup
} from "semantic-ui-react"
import { arrayOf, object } from "prop-types"
import "./Lyrics.css"
import store from "../../../reducers/store"

class LyricsSection extends PureComponent {
  state = { hasVoted: false }

  static propTypes = {
    lyrics: arrayOf(object)
  }

  static defaultProps = {
    songId: 41413
  }

  componentWillReceiveProps = nextProps => {
    console.log("nextprops", nextProps)
    if (nextProps.verses && !nextProps.hasInitializeLyrics) {
      this.props.dispatch({
        type: "INITIALIZE_VERSES",
        payload: nextProps.verses
      })
    }
  }

  handleAdd = (verse, index, event) => {
    let newVerse = cloneDeep(verse)
    let score = verse.score
    score = score + 1
    newVerse.score = score

    let currentVerse = newVerse
    currentVerse.index = index
    this.setState({ hasVoted: true })

    this.props.dispatch({ type: "REPLACE_VERSES", payload: currentVerse })
  }

  handleDeduct = (verse, event) => {
    console.log("verse", verse)
    this.setState({ hasVoted: true })
  }

  renderLyrics = (verse, index, currentLine) => {
    const currentVerse = store
      .getState()
      .verses.find(item => item.line === currentLine && item.id === verse.id)

    if (currentLine === verse.line) {
      return (
        <Popup
          hoverable
          key={`${verse.line}_${verse.id}`}
          trigger={<span>{` ${verse.word} `}</span>}
        >
          {this.state.hasVoted ? (
            <Label>Score: {currentVerse.score}</Label>
          ) : (
            <div>
              <Button
                icon="plus"
                onClick={this.handleAdd.bind(this, verse, index)}
              />
              <Button
                icon="minus"
                onClick={this.handleAdd.bind(this, verse, index)}
              />
            </div>
          )}
        </Popup>
      )
    } else {
      return (
        <Popup
          hoverable
          key={`${verse.line}_${verse.id}`}
          trigger={
            <span>
              {` ${verse.word} `}
              <br />
            </span>
          }
        >
          {this.state.hasVoted ? (
            <Label>Score: {currentVerse.score}</Label>
          ) : (
            <div>
              <Button
                icon="plus"
                onClick={this.handleAdd.bind(this, verse, index)}
              />
              <Button
                icon="minus"
                onClick={this.handleAdd.bind(this, verse, index)}
              />
            </div>
          )}
        </Popup>
      )
    }
  }

  render = () => {
    let verses = []
    let currentLine = 0
    if (this.props.verses) {
      verses = this.props.verses.map((verse, index) => {
        const sentence = this.renderLyrics(verse, index, currentLine)
        currentLine = currentLine !== verse.line ? verse.line : currentLine
        return sentence
      })
    }

    return (
      <div onMouseLeave={this.handleRemoveLabel}>
        <Header attached="top" as="h4">
          Lyrics
        </Header>
        <Segment attached>
          <Container>
            <p>{verses}</p>
          </Container>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default compose(
  connect(mapStateToProps),
  graphql(GET_VERSES, {
    options: ownProps => ({
      variables: { song_id: ownProps.songId }
    }),
    props: ({ data: { verses } }) => {
      return { verses }
    }
  })
)(LyricsSection)
