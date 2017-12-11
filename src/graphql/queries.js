import gql from "graphql-tag"

export const GET_ARTIST_INFO = gql`
  query getArtistInfo($artist_id: Int!) {
    artist(artist_id: $artist_id)
  }
`

export const GET_TRACKS = gql`
  query getTracks($artist_id: Int!) {
    albumsByArtist(artist_id: $artist_id)
  }
`

export const GET_USER_INFO = gql`
  query getUser($user_id: String!) {
    user(user_id: $user_id) {
      _id
      name
      username
      email
      avatar
    }
  }
`
