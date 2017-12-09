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
