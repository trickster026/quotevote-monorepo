import React, { Component } from "react"
import {
  Segment,
  Header,
  Item,
  Label,
  Image,
  Pagination
} from "semantic-ui-react"
import PropTypes from "prop-types"

import defaultImage from "../../assets/user_default.png"

class TopAuthors extends Component {
  static propTypes = {
    creators: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        profileImageUrl: PropTypes.string,
        score: PropTypes.shape({
          upvotes: PropTypes.number,
          downvotes: PropTypes.number
        })
      })
    )
  }

  static defaultProps = {
    creators: []
  }

  render = () => {
    if (this.props.creators.length > 0)
      return (
        <Segment>
          <Header as="h1" style={{ fontSize: 24 }}>
            Top Authors
          </Header>
          <Segment basic>
            <Item.Group>
              {this.props.creators.map((item, index) => (
                <Item key={index}>
                  <Image
                    src={item.profileImageUrl || defaultImage}
                    width={50}
                    height={50}
                  />
                  <Item.Content>
                    <Item.Header>{` `}</Item.Header>
                    <Item.Description>
                      <Label color="teal">{item.name}</Label>
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

    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Top Authors
        </Header>
        <Segment basic>Creators not available</Segment>
      </Segment>
    )
  }
}

export default TopAuthors
