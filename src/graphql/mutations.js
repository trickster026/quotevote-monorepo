import gql from "graphql-tag"

export const CREATE_VOTE = gql`
  mutation($vote: VoteInput) {
    createVote(vote: $vote)
  }
`
