import React, { PureComponent } from "react"
import {
  Avatar,
  ChatList,
  ChatListItem,
  CloseIcon,
  Column,
  IconButton,
  MessageGroup,
  MessageList,
  Row,
  SendButton,
  Subtitle,
  TextComposer,
  TextInput,
  Title,
  TitleBar
} from "@livechat/ui-kit"
import { Button, Icon, Loader, Transition } from "semantic-ui-react"
import { Query, Subscription } from "react-apollo"
import "emoji-mart/css/emoji-mart.css"
import {
  CHAT_QUERY,
  CHAT_SUBSCRIPTION,
  MESSAGE_MUTATION,
  USER_BUDDY_LIST
} from "./ChatGraphQL"
import MessageEmojiPortal from "./MessageEmojiPortal"
import MessageBox from "./MessageBox"
import PropTypes from "prop-types"

const defaultTitle = "Buddy List"

class GlobalMaximized extends PureComponent {
  state = {
    animation: "slide left",
    duration: 300,
    visible: true,
    user: null,
    title: defaultTitle,
    selectedMessageRoomId: null,
    inputText: ""
  }

  handleVisibility = () => this.setState({ visible: !this.state.visible })

  handleSubmit = data => {
    const { buddyId } = this.state.user
    const newMessage = {
      title: "", // TODO
      text: data,
      imageUrl: "" // TODO
    }

    this.props.client.mutate({
      mutation: MESSAGE_MUTATION,
      variables: { message: newMessage, userId: buddyId }
    })

    this.setState({ inputText: "" })
  }

  handleBuddySelection = user => {
    const { lastMessage } = user
    const { messageRoomId } = lastMessage
    this.setState({
      user,
      title: user.name,
      selectedMessageRoomId: messageRoomId
    })
    this.handleVisibility()
  }

  renderChatListItem = user => {
    const { buddyId, name, avatar, lastMessage } = user
    const { text } = lastMessage
    return (
      <ChatListItem
        key={`chatList${buddyId}`}
        onClick={() => this.handleBuddySelection(user)}
      >
        <Avatar key={`avatar${buddyId}`} imgUrl={avatar} />
        <Column key={`column${buddyId}`}>
          <Row justify key={`row${buddyId}`}>
            <Title ellipsis key={`title${buddyId}`}>{`${name}`}</Title>
          </Row>
          <Subtitle ellipsis key={`subtitle${buddyId}`}>
            {text}
          </Subtitle>
        </Column>
      </ChatListItem>
    )
  }

  renderBuddyList = () => {
    return (
      <Query query={USER_BUDDY_LIST} fetchPolicy="cache">
        {({ loading, error, data }) => {
          if (error) return "Error loading buddy list"
          if (loading) return this.renderLoading()
          const { userBuddyList } = data
          return userBuddyList.map(user => this.renderChatListItem(user))
        }}
      </Query>
    )
  }

  setInput = inputText => {
    this.setState({ inputText }, () => {
      const input = this.input
      input.state.value = inputText
      this.forceUpdate()
    })
  }

  handleBackButton = () => {
    this.setState({ user: null, title: defaultTitle })
    this.handleVisibility()
  }

  renderMessageList = messages => {
    const { lastMessage } = this.state.user
    const variables = { messageRoomId: lastMessage.messageRoomId }
    return (
      <React.Fragment>
        <Button
          icon
          color="blue"
          labelPosition="left"
          onClick={this.handleBackButton}
        >
          <Icon name="arrow left" />
          Back
        </Button>
        <div style={{ marginTop: "5px" }}>
          {messages.map((message, index) => this.renderMessageBox(message))}
          <Subscription
            subscription={CHAT_SUBSCRIPTION}
            variables={variables}
            onSubscriptionData={({ client, subscriptionData }) => {
              console.log("CHAT_SUBSCRIPTION", subscriptionData)
            }}
          >
            {({ data, loading, error }) => {
              if (loading || error) return null
              const { userMessageCreated } = data
              return this.renderMessageBox(userMessageCreated)
            }}
          </Subscription>
        </div>
      </React.Fragment>
    )
  }

  renderMessageBox = message => (
    <MessageGroup
      key={message._id}
      onlyFirstWithMeta
      avatar={message.userAvatar}
      isOwn={false}
    >
      <MessageBox
        id={message._id}
        key={message._id}
        message={message}
        setInput={this.setInput}
      />
    </MessageGroup>
  )

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

  renderUserMessages = () => {
    if (!this.state.user) {
      return null
    }
    const { lastMessage } = this.state.user
    const variables = { messageRoomId: lastMessage.messageRoomId }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Query query={CHAT_QUERY} variables={variables}>
          {({ data, error, loading }) => {
            if (error) return "Sorry, something went wrong. Please try again."
            if (loading) return this.renderLoading()
            const { userMessages } = data
            return (
              <MessageList active containScrollInSubtree>
                {this.renderMessageList(userMessages)}
              </MessageList>
            )
          }}
        </Query>
      </div>
    )
  }

  render = () => {
    const { minimize } = this.props
    const {
      visible,
      animation,
      duration,
      selectedMessageRoomId,
      user
    } = this.state
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
          title={this.state.title}
        />
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%"
          }}
        >
          <MessageList active containScrollInSubtree>
            <Transition.Group animation={animation} duration={duration}>
              {visible && (
                <ChatList style={{ maxWidth: "100%" }}>
                  {this.renderBuddyList()}
                </ChatList>
              )}
            </Transition.Group>

            <Transition.Group animation={animation} duration={duration}>
              {!visible && this.renderUserMessages()}
            </Transition.Group>
          </MessageList>
        </div>
        {!visible && (
          <TextComposer
            onSend={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.inputText}
            ref={ref => (this.input = ref)}
          >
            <Row align="center">
              <TextInput />
              <SendButton />
            </Row>
            <Row verticalAlign="center" justify="right">
              <MessageEmojiPortal
                messageRoomId={
                  selectedMessageRoomId || user.lastMessage.messageRoomId
                }
                setInput={this.setInput}
              />
            </Row>
          </TextComposer>
        )}
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

GlobalMaximized.propTypes = {
  client: PropTypes.object.isRequired
}

export default GlobalMaximized
