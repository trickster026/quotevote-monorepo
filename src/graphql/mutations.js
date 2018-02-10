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
