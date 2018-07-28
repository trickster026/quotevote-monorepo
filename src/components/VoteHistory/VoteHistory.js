import React, { Component } from "react"
import { Segment, Header, Item, Label, Icon } from "semantic-ui-react"
import moment from "moment"

const voteHistoryData = [
  {
    type: "upvote",
    text: "lorem ipsum",
    title: "text 1",
    author: "John Doe",
    timestamp: "00:00:00",
    score: { upvotes: 1, downvotes: 2 }
  },
  {
    type: "upvote",
    text: "lorem ipsum",
    title: "text 1",
    author: "John Doe",
    timestamp: "00:00:00",
    score: { upvotes: 1, downvotes: 2 }
  },
  {
    type: "upvote",
    text: "lorem ipsum",
    title: "text 1",
    author: "John Doe",
    timestamp: "00:00:00",
    score: { upvotes: 1, downvotes: 2 }
  },
  {
    type: "upvote",
    text: "lorem ipsum",
    title: "text 1",
    author: "John Doe",
    timestamp: "00:00:00",
    score: { upvotes: 1, downvotes: 2 }
  },
  {
    type: "upvote",
    text: "lorem ipsum",
    title: "text 1",
    author: "John Doe",
    timestamp: "00:00:00",
    score: { upvotes: 1, downvotes: 2 }
  }
]

class VoteHistory extends Component {
  render = () => {
    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Vote History
        </Header>
        <Segment basic>
          <Item.Group>
            {voteHistoryData.map((vh, index) => (
              <Item key={index} style={{ marginBottom: 15 }}>
                <Item.Content>
                  <Item.Header as="h6">
                    <Label color="teal">
                      <Icon
                        name={vh.type === "upvote" ? "arrow up" : "arrow down"}
                      />
                    </Label>
                    <Label color="grey">{vh.text}</Label>
                  </Item.Header>
                  <Item.Description>
                    <Label color="teal">
                      {`[${vh.title}] by [${vh.author}]`}
                    </Label>
                    <Label color="teal">
                      {moment(vh.timestamp).format("hh:mm:ss")}
                    </Label>
                    <Label color="teal">{`${vh.score.upvotes} / - ${
                      vh.score.downvotes
                    }`}</Label>
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </Segment>
    )
  }
}

export default VoteHistory
