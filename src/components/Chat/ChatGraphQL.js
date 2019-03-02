import gql from "graphql-tag"

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

export const MESSAGE_REACTIONS_USER_TOOLTIP_QUERY = gql`
  query userMessageReactionToolTip($messageId: String!, $reactionId: String!) {
    userMessageReactionToolTip(messageId: $messageId, reactionId: $reactionId) {
      _id
      userId
      messageId
      reaction
      created
      user {
        name
      }
    }
  }
`

export const CREATE_USER_MESSAGE_REACTION_MUTATION = gql`
  mutation createUserReaction($messageId: String!, $reaction: String!) {
    createUserReaction(messageId: $messageId, reaction: $reaction) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

export const DELETE_USER_MESSAGE_REACTION_MUTATION = gql`
  mutation deleteUserReaction($reactionId: String!) {
    deleteUserReaction(reactionId: $reactionId) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`

export const USER_REACTION_SUBSCRIPTION = gql`
  subscription userReaction($messageId: String!) {
    userReaction(messageId: $messageId) {
      _id
      userId
      messageId
      reaction
      created
    }
  }
`
