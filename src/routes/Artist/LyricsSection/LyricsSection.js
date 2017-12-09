import React, { PureComponent } from "react"
import { Segment, Container, Header, Label, Button } from "semantic-ui-react"
import { arrayOf, object } from "prop-types"

class LyricsSection extends PureComponent {
  state = { activeVerse: null, hoveredVerse: null }

  static propTypes = {
    lyrics: arrayOf(object)
  }

  static defaultProps = {
    lyrics: [
      {
        verse:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ",
        score: 0,
        verse_id: 0
      },
      {
        verse:
          "tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ",
        score: 2,
        verse_id: 2
      },
      {
        verse:
          "semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ",
        score: 5,
        verse_id: 12
      },
      {
        verse:
          "ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ",
        score: 1,
        verse_id: 20
      },
      {
        verse:
          "fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ",
        score: 5,
        verse_id: 29
      },
      {
        verse:
          "Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ",
        score: 4,
        verse_id: 10
      },
      {
        verse:
          "neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ",
        score: 100,
        verse_id: 100
      },
      {
        verse: "accumsan porttitor, facilisis luctus, metus",
        score: 900,
        verse_id: 900
      }
    ]
  }

  handleLyricsClick = id => {
    this.setState({ activeVerse: id })
  }

  handleRemoveLabel = () => {
    this.setState({ activeVerse: null, hoveredVerse: null })
  }

  handleLyricsHover = id => {
    this.setState({ hoveredVerse: id })
  }

  render = () => {
    const lyrics = (
      <div style={{ fontSize: "16px" }}>
        {this.props.lyrics.map(line => (
          <div
            key={line.verse_id}
            style={{ paddingTop: "5px", paddingBottom: "5px" }}
            onDoubleClick={this.handleLyricsClick.bind(this, line.verse_id)}
            onMouseOver={this.handleLyricsHover.bind(this, line.verse_id)}
          >
            {this.state.hoveredVerse === line.verse_id ? (
              <strong>{line.verse}</strong>
            ) : (
              line.verse
            )}
            {this.state.activeVerse === line.verse_id && (
              <Label pointing="left">
                <Button color="green" icon="plus" size="mini" compact />
                <Button color="red" icon="minus" size="mini" compact />
                <Button color="teal" size="mini" compact>
                  {`+ ${line.score}`}
                </Button>
              </Label>
            )}
          </div>
        ))}
      </div>
    )
    return (
      <div onMouseLeave={this.handleRemoveLabel}>
        <Header attached="top" as="h4">
          Lyrics
        </Header>
        <Segment attached>
          <Container>{lyrics}</Container>
        </Segment>
      </div>
    )
  }
}

export default LyricsSection
