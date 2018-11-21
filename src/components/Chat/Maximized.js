import React, { Component } from "react"
import {
  CloseIcon,
  EmojiIcon,
  IconButton,
  Message,
  MessageButton,
  MessageButtons,
  MessageGroup,
  MessageList,
  MessageMedia,
  MessageText,
  MessageTitle,
  Row,
  SendButton,
  TextComposer,
  TextInput,
  TitleBar
} from "@livechat/ui-kit"

import moment from "moment"

class Maximized extends Component {
  componentDidMount() {
    this.props.subscribeToNewMessages()
  }

  render = () => {
    const {
      data,
      onMessageSend,
      ownId,
      minimize,
      sendMessage,
      title
    } = this.props

    console.log("[Maximized.js]", this.props)
    console.log({ data })
    let messages = []
    if (data && "messages" in data) {
      messages = data.messages
    } else if (data && "userMessages" in data) {
      messages = data["userMessages"]
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <TitleBar
          rightIcons={[
            <IconButton key="close" onClick={minimize}>
              <CloseIcon />
            </IconButton>
          ]}
          title={title}
        />
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%"
          }}
        >
          <MessageList active containScrollInSubtree>
            {messages.map((message, index) => (
              <MessageGroup
                key={index}
                onlyFirstWithMeta
                avatar={message.userId === ownId ? "" : message.userAvatar}
                isOwn={message.userId === ownId}
              >
                <Message
                  date={moment(message.date).format("MMM D, h:mm a")}
                  isOwn={message.userId === ownId}
                  key={message._id}
                  avatar={message.avatarUrl}
                >
                  {message.title && <MessageTitle title={message.title} />}
                  {message.text && <MessageText>{message.text}</MessageText>}
                  {message.imageUrl && (
                    <MessageMedia>
                      <img src={message.imageUrl} alt="" />
                    </MessageMedia>
                  )}
                  {message.buttons &&
                    message.buttons.length !== 0 && (
                      <MessageButtons>
                        {message.buttons.map((button, buttonIndex) => (
                          <MessageButton
                            key={buttonIndex}
                            label={button.title}
                            onClick={() => {
                              sendMessage(button.postback)
                            }}
                          />
                        ))}
                      </MessageButtons>
                    )}
                </Message>
              </MessageGroup>
            ))}
          </MessageList>
        </div>
        <TextComposer onSend={onMessageSend}>
          <Row align="center">
            <TextInput fill="true" />
            <SendButton fit />
          </Row>

          <Row verticalAlign="center" justify="right">
            <IconButton fit>
              <EmojiIcon />
            </IconButton>
          </Row>
        </TextComposer>
        <div
          style={{
            textAlign: "center",
            fontSize: ".6em",
            padding: ".4em",
            background: "#fff",
            color: "#888"
          }}
        >
          {"Powered by Scoreboard.com"}
        </div>
      </div>
    )
  }
}

export default Maximized
