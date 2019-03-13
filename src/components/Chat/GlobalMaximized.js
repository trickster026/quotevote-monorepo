import React, { PureComponent } from "react"
import {
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
import { Query } from "react-apollo"
import "emoji-mart/css/emoji-mart.css"
import { USER_BUDDY_LIST } from "./ChatGraphQL"

class GlobalMaximized extends PureComponent {
  state = {}

  renderChatListItem = user => {
    const { buddyId, name, avatar, lastMessage } = user
    const { text } = lastMessage
    return (
      <ChatListItem key={`chatList${buddyId}`}>
        <Avatar imgUrl={avatar} />
        <Column fill>
          <Row justify>
            <Title ellipsis>{`${name}`}</Title>
          </Row>
          <Subtitle ellipsis>{text}</Subtitle>
        </Column>
      </ChatListItem>
    )
  }

  renderBuddyList = () => {
    return (
      <Query query={USER_BUDDY_LIST}>
        {({ loading, error, data }) => {
          if (error) return "Error loading buddy list"
          if (loading) return "Loading..."
          const { userBuddyList } = data
          return userBuddyList.map(user => this.renderChatListItem(user))
        }}
      </Query>
    )
  }

  render = () => {
    const { minimize } = this.props
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
          title={"Buddy List"}
        />
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%"
          }}
        >
          <MessageList active containScrollInSubtree>
            <ChatList style={{ maxWidth: "100%" }}>
              {this.renderBuddyList()}
            </ChatList>
          </MessageList>
        </div>
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

export default GlobalMaximized
