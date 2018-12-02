import React, { Component } from "react"
import ReactDOM from "react-dom"
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
import { Loader, Portal } from "semantic-ui-react"
import { Picker } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"

import moment from "moment"

class Maximized extends Component {
  state = {
    open: false,
    top: 0,
    left: 0,
    inputText: ""
  }

  componentDidMount() {
    this.props.subscribeToNewMessages()
    this.setEmojiLocation()
    window.addEventListener("resize", this.setEmojiLocation)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setEmojiLocation)
  }

  setEmojiLocation = () => {
    const domNode = ReactDOM.findDOMNode(this)
    const domRect = domNode.getBoundingClientRect()
    this.setState({
      top: domRect.top - 40,
      left: domRect.left + 50
    })
  }

  renderMessageList = messages => {
    const { ownId, sendMessage } = this.props

    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }

  renderLoading = () => {
    return (
      <div
        style={{
          position: "relative",
          top: "35%",
          transform: "translate(0,50%)"
        }}
      >
        <Loader active inline="centered" content="Loading" />
      </div>
    )
  }

  handleEmojiPicker = emoji => {
    console.log({ emoji })
    let sym = emoji.unified.split("-")
    let codesArray = []
    sym.forEach(el => codesArray.push("0x" + el))
    let emojiPic = String.fromCodePoint(...codesArray)
    this.setState(
      {
        inputText: this.state.inputText + emojiPic,
        open: !this.state.open
      },
      () => {
        const input = this.input
        input.state.value = this.state.inputText
        this.forceUpdate()
      }
    )
  }

  handleClick = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  handleChange = e => {
    console.log("handleChange", e.target.value)
    this.setState({ inputText: e.target.value })
  }

  renderEmojiPortal = () => {
    const { open, left, top } = this.state

    return (
      <Portal onClose={this.handleClose} open={open}>
        <div style={{ left, position: "fixed", top, zIndex: 1000 }}>
          <Picker
            onSelect={this.handleEmojiPicker}
            title="Scoreboard™"
            set="google"
          />
        </div>
      </Portal>
    )
  }

  handleSubmit = event => {
    const { onMessageSend } = this.props
    onMessageSend(event)
    this.setState({ inputText: "" })
  }

  render = () => {
    const { data, minimize, title, loading } = this.props

    let messages = []
    if (data && "messages" in data) {
      messages = data.messages
    } else if (data && "userMessages" in data) {
      messages = data["userMessages"]
    }

    console.log({ messages })
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
            {loading ? this.renderLoading() : this.renderMessageList(messages)}
          </MessageList>
        </div>
        <TextComposer
          onSend={this.handleSubmit}
          value={this.state.inputText}
          onChange={this.handleChange}
          ref={ref => (this.input = ref)}
        >
          <Row align="center">
            <TextInput />
            <SendButton />
          </Row>
          <Row verticalAlign="center" justify="right">
            <IconButton fit>
              <EmojiIcon onClick={this.handleClick} />
            </IconButton>
          </Row>
        </TextComposer>
        <div>{this.renderEmojiPortal()}</div>
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
