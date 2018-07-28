import React, { Component } from "react"
import { Segment, Header, Item, Image, Label } from "semantic-ui-react"
import defaultImage from "../../assets/image.png"

const quotesData = [
  {
    quote: "lorem ipsum",
    image: defaultImage,
    title: "text 1",
    author: "John Doe"
  },
  {
    quote: "lorem ipsum",
    image: defaultImage,
    title: "text 1",
    author: "John Doe"
  },
  {
    quote: "lorem ipsum",
    image: defaultImage,
    title: "text 1",
    author: "John Doe"
  },
  {
    quote: "lorem ipsum",
    image: defaultImage,
    title: "text 1",
    author: "John Doe"
  },
  {
    quote: "lorem ipsum",
    image: defaultImage,
    title: "text 1",
    author: "John Doe"
  }
]

class QuoteWall extends Component {
  render = () => {
    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Quote Wall
        </Header>
        <Item.Group>
          {quotesData.map((item, index) => (
            <Item key={index}>
              <Image src={item.image || defaultImage} width={50} height={50} />
              <Item.Content>
                <Item.Header>
                  <Label color="grey">{item.quote}</Label>
                </Item.Header>
                <Item.Description>
                  <Label color="teal">{`[${item.title}] by [${
                    item.author
                  }]`}</Label>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    )
  }
}

export default QuoteWall
