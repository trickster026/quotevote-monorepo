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
import { connect } from "react-redux"
import { chatReaction } from "../../actions/creators/chatCreator"
import ReactionEmojiPortal from "./ReactionEmojiPortal"

class MessageBox extends React.PureComponent {
  render = () => {
    return (
      <div onMouseEnter={this.toggleReactionVisibility}>
        {this.renderMessage()}
        {this.renderReaction()}
      </div>
    )
  }

  toggleReactionVisibility = () => {
    const { message } = this.props
    this.props.toggleChatReaction(message._id)
  }

  renderMessage = () => {
    const { message } = this.props
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

  renderReactButtons = () => {
    return <React.Fragment />
  }

  renderReaction = () => {
    const { messageId, message, setInput } = this.props
    const showAll = messageId === message._id

    if (showAll) {
      return (
        <div style={{ float: "left" }}>
          {this.renderReactButtons()}
          <Button circular icon="thumbs up" />
          <Button circular icon="thumbs down" />
          <ReactionEmojiPortal messageId={message._id} setInput={setInput} />
        </div>
      )
    }

    return <div style={{ float: "left" }}>{this.renderReactButtons()}</div>
  }
}

MessageBox.propTypes = {
  message: PropTypes.object.isRequired
}

const mapStateToProps = ({ chat }) => {
  return chat
}

const mapDispatchToProps = dispatch => ({
  toggleChatReaction: messageId => {
    dispatch(chatReaction(messageId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox)
