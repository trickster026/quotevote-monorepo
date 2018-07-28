import React, { Component } from "react"
import { Segment, Header, Dropdown } from "semantic-ui-react"

const options = [
  { text: "text1", value: "text1", key: "text1" },
  { text: "text2", value: "text2", key: "text2" },
  { text: "text3", value: "text3", key: "text3" },
  { text: "text4", value: "text4", key: "text4" },
  { text: "text5", value: "text5", key: "text5" }
]

class UserText extends Component {
  render = () => {
    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          User's Text
        </Header>
        <Dropdown placeholder="Select Text" fluid selection options={options} />
      </Segment>
    )
  }
}

export default UserText
