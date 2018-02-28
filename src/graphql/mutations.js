import gql from "graphql-tag"

export const CREATE_VOTE = gql`
  mutation($vote: VoteInput) {
    createVote(vote: $vote)
  }
`

export const FOLLOW = gql`
  mutation follow($artist_id: Int!, $user_id: String!) {
    follow(artist_id: $artist_id, user_id: $user_id) {
      _id
      artist_id
      name
      image_url
      total_score
      upvotes
      downvotes
    }
  }
`

export const UNFOLLOW = gql`
  mutation follow($artist_id: Int!, $user_id: String!) {
    unfollow(artist_id: $artist_id, user_id: $user_id) {
      _id
      artist_id
      name
      image_url
      total_score
      upvotes
      downvotes
    }
  }
`

export const UPDATE_USER = gql`
  mutation($user: UserInput) {
    updateUser(user: $user) {
      _id
      name
      username
      email
      quotes
    }
  }
`

export const FOLLOW_USERS = gql`
  mutation followUser($user_id: String!) {
    followUser(user_id: $user_id, action: "follow") {
      _id
      name
      username
      email
      avatar
      quotes
      _followersId
      _followingId
    }
  }
`

export const UNFOLLOW_USERS = gql`
  mutation followUser($user_id: String!) {
    followUser(user_id: $user_id, action: "unfollow") {
      _id
      name
      username
      email
      avatar
      quotes
      _followersId
      _followingId
    }
  }
`

export const USER_REQUEST_INVITE = gql`
  mutation sendUserInvite($email: String!) {
    sendUserInvite(mail_to: $email)
  }
`
