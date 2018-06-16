import React, { PureComponent } from "react"
import { Table } from "semantic-ui-react"

import FlipCard from "../Flipboard/FlipCard"
import Section from "../Layouts/Section/Section"
import PropTypes from "prop-types"

import "./TopArtist.css"

const PAD_LENGTH = 19
const pad = (char, length, value, direction = "right") => {
  if (direction === "right") {
    return value + char.repeat(Math.max(char, length - value.length))
  } else {
    return char.repeat(Math.max(char, length - value.length)) + value
  }
}

class TopArtists extends PureComponent {
  static propTypes = {
    artists: PropTypes.array
  }

  render = () => {
    const { artists } = this.props
    return (
      <Section title="Top Artists">
        <Table basic="very">
          <Table.Body>
            {artists &&
              artists.map((artist, index) => {
                let artistName = ""
                if (artist.artistName.length > PAD_LENGTH) {
                  artistName = artist.artistName.substring(0, PAD_LENGTH)
                } else {
                  artistName = pad(" ", PAD_LENGTH, artist.artistName)
                }
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{artistName}</Table.Cell>
                    <Table.Cell>
                      <FlipCard
                        content={artist.totalScore.toString()}
                        width={22}
                        height={30}
                        fontSize={16}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table>
      </Section>
    )
  }
}

export default TopArtists
