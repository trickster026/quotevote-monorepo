import React, { Component } from "react"
import { Segment, Header, Item, Pagination, Label } from "semantic-ui-react"

const data = [
  {
    title: "Juicy",
    author: "The Notorious B.I.G.",
    timestamp: "00:00:00",
    score: { upvotes: 0, downvotes: 0 }
  },
  {
    title: "Juicy",
    author: "The Notorious B.I.G.",
    timestamp: "00:00:00",
    score: { upvotes: 0, downvotes: 0 }
  },
  {
    title: "Juicy",
    author: "The Notorious B.I.G.",
    timestamp: "00:00:00",
    score: { upvotes: 0, downvotes: 0 }
  }
]

class TopContent extends Component {
  render = () => {
    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Top Content
        </Header>
        <Segment basic>
          <Item.Group>
            {data.map((obj, index) => (
              <Item key={index}>
                <Item.Content>
                  <Item.Header as="h6">
                    <Label color="teal">{index}</Label>
                    <Label color="grey">{obj.title}</Label>
                  </Item.Header>
                  <Item.Description>
                    <Label color="teal">{obj.author}</Label>
                    <Label color="teal">{obj.timestamp}</Label>
                    <Label color="teal">{`${obj.score.upvotes} / - ${
                      obj.score.downvotes
                    }`}</Label>
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
        <Pagination defaultActivePage={1} totalPages={3} />
      </Segment>
    )
  }
}

export default TopContent
