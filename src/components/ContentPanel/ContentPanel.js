import React, { Component } from "react"
import { Divider, Icon, Item } from "semantic-ui-react"
import FlexView from "react-flexview"
import PropTypes from "prop-types"
import moment from "moment"
import ReactTooltip from "react-tooltip"
import { ApolloConsumer } from "react-apollo"
import gql from "graphql-tag"

const BOOKMARK_CONTENT = gql`
  mutation updateUserAdminRight($contentId: String) {
    createContentChatRoom(contentId: $contentId) {
      _id
      users
      messageType
    }
  }
`
const REMOVE_BOOKMARK_CONTENT = gql`
  mutation updateUserAdminRight($contentId: String) {
    removeContentChatRoom(contentId: $contentId) {
      _id
      users
      messageType
    }
  }
`

class ContentPanel extends Component {
  state = {
    bookmark:
      this.props.userContentChatRoom &&
      this.props.userContentChatRoom._id !== "0"
  }

  static propTypes = {
    title: PropTypes.string,
    score: PropTypes.shape({
      upvotes: PropTypes.number,
      downvotes: PropTypes.number
    }),
    bookmark: PropTypes.bool,
    created: PropTypes.string,
    contentId: PropTypes.string
  }

  static defaultProps = {
    title: "Unknown Content",
    score: {
      upvotes: 0,
      downvotes: 0
    },
    bookmark: false,
    contentId: ""
  }

  handleClick = client => {
    const _bookmark = this.state.bookmark
    this.setState({ bookmark: !_bookmark })

    const { contentId } = this.props
    client.mutate({
      mutation: !_bookmark ? BOOKMARK_CONTENT : REMOVE_BOOKMARK_CONTENT,
      variables: { contentId }
    })
  }

  render = () => {
    const { bookmark } = this.state
    const { title, score, created } = this.props
    return (
      <ApolloConsumer>
        {client => (
          <div style={{ margin: "20px" }}>
            <FlexView vAlignContent="center">
              <div style={{ fontFamily: "'Raleway', sans-serif" }}>
                <b style={{ fontWeight: 600 }}>{title} </b>
                <Icon
                  data-for="bookmark"
                  data-tip={
                    bookmark
                      ? "Remove bookmark."
                      : "Bookmark content to buddy list."
                  }
                  name="bookmark"
                  link
                  color={bookmark ? "green" : "black"}
                  onClick={() => this.handleClick(client)}
                />
                <ReactTooltip id="bookmark" />
                <span
                  style={{
                    marginLeft: "200px",
                    marginRight: "5px",
                    float: "right"
                  }}
                >
                  <Icon name="chevron up" color="green" size="large" />
                  <b> {score.upvotes}</b>
                  <Icon name="chevron down" color="red" size="large" />
                  <b> {score.downvotes}</b>
                </span>
              </div>
            </FlexView>
            <Divider />
            {this.props.children}
            <Divider />
            <Item.Extra>
              <span
                style={{
                  color: "#d6d6d6",
                  float: "right",
                  marginLeft: "10px",
                  fontWeight: 200
                }}
              >
                Posted {moment(created).format("MMM DD, YYYY")}
              </span>
            </Item.Extra>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default ContentPanel
