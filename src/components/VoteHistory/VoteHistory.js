import React, { Component } from "react"
import { Button, Header, Icon, Item, Segment } from "semantic-ui-react"
import moment from "moment"
import PropTypes from "prop-types"
import faker from "faker"
import "./VoteHistory.css"
import HistoryVoteExtra from "./HistoryVoteExtra"

class VoteHistory extends Component {
  static propTypes = {
    history: PropTypes.arrayOf({
      type: PropTypes.string,
      description: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      tokens: PropTypes.number,
      loading: PropTypes.bool
    })
  }

  static defaultProps = {
    history: []
  }

  render = () => {
    if (this.props.loading)
      return (
        <div className="root">
          <Header
            as="h1"
            style={{ fontSize: 14, paddingTop: 20, paddingLeft: 10 }}
          >
            Vote History
          </Header>
          <Item.Group divided>
            <Item
              style={{
                backgroundColor: "#dbefdc",
                padding: "10px",
                display: "flex"
              }}
            >
              <Item.Content verticalAlign="bottom">
                <Item.Description>
                  <Icon name="arrow up" />
                  {faker.lorem.paragraph()}
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    circular
                    color="green"
                    icon="question"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
            <Item style={{ backgroundColor: "#fdd9d7", padding: "10px" }}>
              <Item.Content verticalAlign="bottom">
                <Item.Description>
                  <Icon name="arrow down" />
                  {faker.lorem.paragraph()}
                </Item.Description>
                <Item.Extra>
                  <Button color="red" floated="right">
                    -{faker.random.number()}
                  </Button>
                  <Button color="green" floated="right">
                    +{faker.random.number()}
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
      )

    if (this.props.history.length > 0) console.log(this.props.history)
    return (
      <div className="root">
        <Header
          as="h1"
          style={{ fontSize: 14, paddingTop: 20, paddingLeft: 10 }}
        >
          Vote History
        </Header>
        <Item.Group divided>
          {this.props.history.map((vh, index) => (
            <Item
              key={index}
              style={{
                backgroundColor: vh.action === "upvote" ? "#dbefdc" : "#fdd9d7",
                padding: "5px"
              }}
            >
              <Item.Content verticalAlign="bottom">
                <Item.Description>
                  <Icon
                    name={vh.action === "upvote" ? "arrow up" : "arrow down"}
                  />
                  {vh.description}
                </Item.Description>
                <Item.Extra>
                  {/*{moment(vh.created).format("MMM DD, YYYY hh:mm:ss")}*/}
                  {moment(vh.created).fromNow()}
                </Item.Extra>
                <HistoryVoteExtra voteHistory={vh} />
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
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
