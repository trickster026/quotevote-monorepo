import React, { PureComponent, Fragment } from "react"
import { Input, Button, Popup, Label } from "semantic-ui-react"
import PropTypes from "prop-types"

class ActionPopup extends PureComponent {
  state = { isVoting: true, isCommenting: false, comment: "" }

  static propTypes = {
    show: PropTypes.bool,
    points: PropTypes.number,
    onAddComment: PropTypes.func,
    onShareQuote: PropTypes.func,
    onVote: PropTypes.func
  }

  static defaultProps = {
    show: false,
    points: 0,
    onAddComment: () => {},
    onShareQuote: () => {},
    onVote: () => {}
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.show) {
      this.setState({ isCommenting: false, isVoting: true })
    }
  }

  handleButtonClick = event => {
    const { name } = event.currentTarget
    if (name === "comment") {
      this.setState(prev => ({ isCommenting: !prev.isCommenting }))
    } else {
      this.setState({ isVoting: false })
      this.props.onVote(event, name === "upvote")
    }
  }

  handleAddComment = event => {
    this.props.onAddComment(event, this.state.comment)
  }

  handleCommentChange = (event, data) => {
    this.setState({ comment: data })
  }

  handleCancelComment = event => {
    this.setState({ isCommenting: false })
  }

  handleShareQuote = event => {
    this.props.onShareQuote(event)
  }

  renderScoreAndQuotes = () => (
    <Fragment>
      <Button inverted>{`${this.props.points}`}</Button>
      <Button
        name="comment"
        inverted
        icon="circle"
        onClick={this.handleButtonClick}
      />
      <Popup
        trigger={
          <Button icon="quote right" inverted onClick={this.handleShareQuote} />
        }
        on="click"
        content="Shared on your wall"
        hideOnScroll
      />
    </Fragment>
  )

  renderButtons = () => (
    <Fragment>
      <Button
        color="green"
        inverted
        icon="plus"
        name="upvote"
        onClick={this.handleButtonClick}
      />
      <Button
        name="comment"
        inverted
        icon="circle"
        onClick={this.handleButtonClick}
      />
      <Button
        color="red"
        inverted
        icon="minus"
        name="downvote"
        onClick={this.handleButtonClick}
      />
    </Fragment>
  )

  renderCommentBox = () => (
    <Input
      action={
        <Fragment>
          <Button color="green" icon="plus" onClick={this.handleAddComment} />
          <Button color="red" icon="close" onClick={this.handleCancelComment} />
        </Fragment>
      }
      placeholder="Write your comment..."
      onChange={this.handleCommentChange}
    />
  )

  renderPopover = () => {
    if (this.state.isCommenting) {
      return this.renderCommentBox()
    } else {
      if (this.state.isVoting) {
        return this.renderButtons()
      }
      return this.renderScoreAndQuotes()
    }
  }

  render = () => {
    if (this.props.show) {
      return (
        <Label pointing="below" color="black">
          {this.renderPopover()}
        </Label>
      )
    }
    return null
  }
}

export default ActionPopup
