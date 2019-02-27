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
import gql from "graphql-tag"
import { Query } from "react-apollo"
import EmojiIcon from "./EmojiIcon"

export const MESSAGE_REACTIONS_QUERY = gql`
  query userMessageReactions($messageId: String!) {
    userMessageReactions(messageId: $messageId) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

class MessageBox extends React.PureComponent {
  render = () => {
    const { message } = this.props
    const variables = { messageId: message._id }
    return (
      <div onMouseEnter={this.toggleReactionVisibility}>
        <Query query={MESSAGE_REACTIONS_QUERY} variables={variables}>
          {({ loading, error, client, data }) => {
            if (loading || error) return null
            return (
              <React.Fragment>
                {this.renderMessage()}
                {this.renderReaction(client, data)}
              </React.Fragment>
            )
          }}
        </Query>
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

  renderReactButtons = (client, data) => {
    return (
      <React.Fragment>
        {data.userMessageReactions.map(userMessageReaction => (
          <Button
            size="mini"
            circular
            color="blue"
            key={userMessageReaction._id}
          >
            <EmojiIcon symbol={userMessageReaction.reaction} />
          </Button>
        ))}
      </React.Fragment>
    )
  }

  renderReaction = (client, data) => {
    const { messageId, message } = this.props
    const showAll = messageId === message._id
    return (
      <div style={{ float: "left" }}>
        {this.renderReactButtons(client, data)}
        {showAll ? <Button circular icon="thumbs up" /> : ""}
        {showAll ? <Button circular icon="thumbs down" /> : ""}
        {showAll ? (
          <ReactionEmojiPortal messageId={messageId} client={client} />
        ) : (
          ""
        )}
      </div>
    )
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
