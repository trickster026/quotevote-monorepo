import React, { Component } from "react"
import { Header, Icon, Item } from "semantic-ui-react"
import moment from "moment"
import PropTypes from "prop-types"
import "./VoteHistory.css"
import HistoryVoteExtra from "./HistoryVoteExtra"

class VoteHistory extends Component {
  static propTypes = {
    history: PropTypes.array.isRequired
  }

  static defaultProps = {
    history: []
  }

  render = () => {
    if (this.props.history.length > 0)
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
                  backgroundColor:
                    vh.action === "upvote" ? "#dbefdc" : "#fdd9d7",
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
    return <div>No vote history available</div>
  }
}

export default VoteHistory
