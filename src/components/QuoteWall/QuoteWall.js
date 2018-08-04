import React, { Component } from "react"
import { Segment, Header, Item, Image, Label } from "semantic-ui-react"
import defaultImage from "../../assets/image.png"

class QuoteWall extends Component {
  renderQuotes = () => {
    const { quotes } = this.props
    if (quotes.length > 0)
      return (
        <Item.Group>
          {quotes.slice(0, 5).map((quote, index) => (
            <Item key={index}>
              <Image
                src={quote.creator.profileImageUrl || defaultImage}
                width={50}
                height={50}
              />
              <Item.Content>
                <Item.Header>
                  <Label color="grey">{quote.quote}</Label>
                </Item.Header>
                <Item.Description>
                  <Label color="teal">{`[${quote.content.title}] by [${
                    quote.creator.name
                  }]`}</Label>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )
    return <div>No quotes available</div>
  }

  render = () => {
    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Quote Wall
        </Header>
        {this.renderQuotes()}
      </Segment>
    )
  }
}

export default QuoteWall
