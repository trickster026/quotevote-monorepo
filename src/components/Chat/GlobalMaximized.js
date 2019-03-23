import React, { PureComponent } from "react"
import {
  AgentBar,
  Avatar,
  ChatList,
  ChatListItem,
  CloseIcon,
  Column,
  IconButton,
  MessageList,
  Row,
  Subtitle,
  Title,
  TitleBar
} from "@livechat/ui-kit"
import { Button, Header, Icon } from "semantic-ui-react"
import { Query } from "react-apollo"
import "emoji-mart/css/emoji-mart.css"
import { USER_BUDDY_LIST } from "./ChatGraphQL"
import PropTypes from "prop-types"
import GlobalUserChat from "./GlobalUserChat"
import ChatLoading from "./ChatLoading"

const defaultTitle = "Buddy List"

class GlobalMaximized extends PureComponent {
  state = {
    visible: true,
    user: null,
    title: defaultTitle,
    selectedMessageRoomId: null,
    inputText: ""
  }

  handleVisibility = () => this.setState({ visible: !this.state.visible })

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
          if (loading) return <ChatLoading />
          const { userBuddyList } = data
          return userBuddyList.map(user => this.renderChatListItem(user))
        }}
      </Query>
    )
  }

  handleBackButton = () => {
    this.setState({ user: null, title: defaultTitle })
    this.handleVisibility()
  }

  renderBackButton = () => (
    <AgentBar>
      <Button
        icon
        color="blue"
        labelPosition="left"
        onClick={this.handleBackButton}
      >
        <Icon name="arrow left" />
        Back
      </Button>
    </AgentBar>
  )

  renderChatList = () => (
    <div
      style={{
        flexGrow: 1,
        minHeight: 0,
        height: "100%",
        background: "#fff"
      }}
    >
      <MessageList active containScrollInSubtree>
        <ChatList style={{ maxWidth: "100%" }}>
          {this.renderBuddyList()}
          <Header as="h4">CONTENT CONVERSATION</Header>
        </ChatList>
      </MessageList>
    </div>
  )

  render = () => {
    const { minimize, client } = this.props
    const { visible, selectedMessageRoomId, user } = this.state
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
        {!visible && this.renderBackButton()}
        {visible && this.renderChatList()}

        {!visible && (
          <GlobalUserChat
            selectedMessageRoomId={selectedMessageRoomId}
            user={user}
            client={client}
          />
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
