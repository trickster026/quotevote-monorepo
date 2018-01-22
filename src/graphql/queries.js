import gql from "graphql-tag"

export const GET_SCORE = gql`
  query getVote($id: Int!) {
    scoreBySong(song_id: $id)
  }
`

export const GET_ARTIST_SCORE = gql`
  query getArtistScores($id: Int!) {
    score(artist_id: $id)
    upvotes(artist_id: $id)
    downvotes(artist_id: $id)
  }
`

export const GET_UPVOTES_PER_SONG = gql`
  query upvotes($song_id: Int!) {
    upvotes(song_id: $song_id)
  }
`

export const GET_DOWNVOTES_PER_SONG = gql`
  query downvotes($song_id: Int!) {
    downvotes(song_id: $song_id)
  }
`

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

export const GET_VERSES = gql`
  query getVerses($song_id: Int!) {
    verses(song_id: $song_id)
  }
`

export const GET_SONG = gql`
  query getSong($song_id: Int!) {
    song(song_id: $song_id) {
      lyricist_data
    }
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
