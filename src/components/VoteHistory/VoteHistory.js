import React, { Component } from "react"
import { Segment, Header, Item, Label, Icon } from "semantic-ui-react"
import moment from "moment"
import PropTypes from "prop-types"

class VoteHistory extends Component {
  static propTypes = {
    history: PropTypes.arrayOf({
      type: PropTypes.string,
      description: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      tokens: PropTypes.number
    })
  }

  static defaultProps = {
    history: []
  }

  render = () => {
    if (this.props.history.length > 0)
      return (
        <Segment>
          <Header as="h1" style={{ fontSize: 24 }}>
            Vote History
          </Header>
          <Segment basic>
            <Item.Group>
              {this.props.history.map((vh, index) => (
                <Item key={index} style={{ marginBottom: 20 }}>
                  <Item.Content>
                    <Item.Header as="h6">
                      <Label
                        color={vh.action === "upvote" ? "green" : "red"}
                        style={{ paddingRight: 0 }}
                      >
                        <Icon
                          name={
                            vh.action === "upvote" ? "arrow up" : "arrow down"
                          }
                        />
                      </Label>
                      <Label color="grey">
                        {vh.description.length > 40
                          ? `${vh.description.substring(0, 40)}...`
                          : vh.description}
                      </Label>
                    </Item.Header>
                    <Item.Description>
                      <Label color="teal">
                        {`[${vh.title}] by [${vh.author}]`}
                      </Label>
                      <Label color="teal">
                        {moment(vh.created).format("hh:mm:ss")}
                      </Label>
                      <Label color="teal">{vh.tokens}</Label>
                    </Item.Description>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          </Segment>
        </Segment>
      )

    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          Vote History
        </Header>
        <Segment basic>
          <div>You haven't voted any content yet!</div>
        </Segment>
      </Segment>
    )
  }
}

export default VoteHistory
