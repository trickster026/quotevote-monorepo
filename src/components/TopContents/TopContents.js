import React, { Component } from "react"
import { Segment, Header, Item, Pagination, Label } from "semantic-ui-react"
import moment from "moment"
import PropTypes from "prop-types"

class TopContents extends Component {
  static propTypes = {
    contents: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        created: PropTypes.string,
        score: PropTypes.shape({
          upvotes: PropTypes.number,
          downvotes: PropTypes.number
        })
      })
    )
  }

  static defaultProps = {
    contents: []
  }

  render = () => {
    if (this.props.contents.length > 0)
      return (
        <Segment>
          <Header as="h1" style={{ fontSize: 24 }}>
            Top Contents
          </Header>
          <Segment basic>
            <Item.Group>
              {this.props.contents.map((content, index) => (
                <Item key={index} style={{ marginBottom: 15 }}>
                  <Item.Content>
                    <Item.Header as="h6">
                      <Label color="teal">{index + 1}</Label>
                      <Label color="grey">{content.title}</Label>
                    </Item.Header>
                    <Item.Description>
                      <Label color="teal">
                        {content.creator
                          ? content.creator.name
                          : "Unknown Author"}
                      </Label>
                      <Label color="teal">
                        {moment(content.created).format("hh:mm:ss")}
                      </Label>
                      <Label color="teal">{`${content.score.upvotes} / - ${
                        content.score.downvotes
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

    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Top Contents
        </Header>
        <Segment basic>No available contents</Segment>
      </Segment>
    )
  }
}

export default TopContents
