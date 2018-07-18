import React, { Component } from "react"
import {
  Segment,
  Header,
  Item,
  Label,
  Image,
  Pagination
} from "semantic-ui-react"

import defaultImage from "../../assets/user_default.png"

const data = [
  {
    image: defaultImage,
    author: "The Notorious B.I.G.",
    score: { upvotes: 5, downvotes: 10 }
  },
  {
    image: defaultImage,
    author: "The Notorious B.I.G.",
    score: { upvotes: 5, downvotes: 10 }
  },
  {
    image: defaultImage,
    author: "The Notorious B.I.G.",
    score: { upvotes: 5, downvotes: 10 }
  },
  {
    image: defaultImage,
    author: "The Notorious B.I.G.",
    score: { upvotes: 5, downvotes: 10 }
  }
]

class TopAuthors extends Component {
  render = () => {
    return (
      <Segment>
        <Header as="h2" style={{ fontSize: 24 }}>
          Top Authors
        </Header>
        <Segment basic>
          <Item.Group>
            {data.map((item, index) => (
              <Item key={index}>
                <Image src={item.image} width={50} height={50} />
                <Item.Content>
                  <Item.Header>{` `}</Item.Header>
                  <Item.Description>
                    <Label color="teal">{item.author}</Label>
                    <Label color="teal">{`${item.score.upvotes} / -${
                      item.score.downvotes
                    }`}</Label>
                  </Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
          <Pagination defaultActivePage={1} totalPages={3} />
        </Segment>
      </Segment>
    )
  }
}

export default TopAuthors
