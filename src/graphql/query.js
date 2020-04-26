import gql from "graphql-tag"

export const GROUPS_QUERY = gql`
query groups($limit: Int!) {
  groups(limit: $limit) {
    _id
    creatorId
    adminIds
    allowedUserIds
    privacy
    title
    url
    description
  }
}
`

export const USER_INVITE_REQUESTS = gql`
  query userInviteRequests {
    userInviteRequests {
      email
      status
      _id
    }
  }
`
export const GET_CONTENT = gql`
  query content($contentId: String!, $key: String!) {
    content(contentId: $contentId) {
      creatorId
      _id
      title
      text
      thumbnail
      created
      creator {
        name
        profileImageUrl
        scoreDetails {
          upvotes
          downvotes
          total
        }
      }
      scoreDetails {
        upvotes
        downvotes
        total
      }
      comments {
        _id
        userId
        text
        hashtags
        created
        quote
      }
    }
    domain(key: $key) {
      _id
      allowedUserIds
      pendingUserIds
      adminIds
      privacy
    }
    userContentChatRoom(contentId: $contentId) {
      _id
      users
      messageType
    }
  }
`

export const SEARCH = gql`
  query search($text: String!) {
    searchContent(text: $text) {
      _id
      title
      creatorId
      domain {
        key
        _id
      }
    }
    searchCreator(text: $text) {
      _id
      name
      avatar
      creator {
        _id
      }
    }
  }
`;

export const GET_BOOK_MARKED = gql`
  query getBookmarkedContents {
    getBookmarkedContents {
      lastMessage
    }
  } 
`;

export const GET_TOP_POSTS = gql`
  query topPosts($limit: Int!, $offset: Int!, $searchKey: String!) {
    topPosts(limit: $limit, offset: $offset, searchKey: $searchKey)
  }
`;
