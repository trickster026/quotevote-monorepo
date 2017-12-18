import gql from "graphql-tag"

export const UPDATE_VOTE = gql`
  mutation($vote: VoteInput) {
    updateVote(vote: $vote)
  }
`
