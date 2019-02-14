import React from "react"
import PropTypes from "prop-types"
import {
  Message,
  MessageMedia,
  MessageText,
  MessageTitle
} from "@livechat/ui-kit"
import { Button } from "semantic-ui-react"
import moment from "moment"

class MessageBox extends React.PureComponent {
  state = {
    showReactionIcon: false
  }

  render = () => {
    const { message } = this.props
    return (
      <div
        onMouseLeave={this.toggleReactionVisibility}
        onMouseEnter={this.toggleReactionVisibility}
      >
        {this.renderMessage(message)}
        {this.renderReaction()}
      </div>
    )
  }

  toggleReactionVisibility = () =>
    this.setState({ showReactionIcon: !this.state.showReactionIcon })

  renderMessage = message => {
    return (
      <Message
        authorName={message.userName}
        date={moment(message.date).format("MMM D, h:mm a")}
        isOwn={false}
        key={message._id}
        avatar={message.userAvatar}
      >
        {message.title && <MessageTitle title={message.title} />}
        {message.text && <MessageText>{message.text}</MessageText>}
        {message.imageUrl && (
          <MessageMedia>
            <img src={message.imageUrl} alt="" />
          </MessageMedia>
        )}
      </Message>
    )
  }

  renderReaction = () => {
    const { showReactionIcon } = this.state
    if (showReactionIcon) {
      return (
        <div style={{ float: "left" }}>
          <Button circular color="twitter" icon="thumbs up" />
          <Button circular color="twitter" icon="thumbs down" />
          <Button circular color="twitter" icon="smile" />
        </div>
      )
    }
  }
}

MessageBox.propTypes = {
  message: PropTypes.object.isRequired
}

export default MessageBox
