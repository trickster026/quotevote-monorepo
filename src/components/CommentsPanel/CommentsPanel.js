import React, { Component } from "react"
import { Header, Segment } from "semantic-ui-react"
import PropTypes from "prop-types"

class CommentsPanel extends Component {
  static propTypes = {
    comments: PropTypes.array
  }

  static defaultProps = {
    comments: []
  }

  renderComments = () => {
    const { comments } = this.props
    if (comments.length > 0) {
      return <div>{comments.map(comment => comment.text).join(" | ")}</div>
    }
    return <div>No comments available</div>
  }

  render = () => {
    return (
      <Segment>
        <Header style={{ fontSize: 24 }}>Comments</Header>
        {this.renderComments()}
      </Segment>
    )
  }
}

export default CommentsPanel
