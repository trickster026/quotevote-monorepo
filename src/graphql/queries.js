import gql from "graphql-tag"

export const GET_SCORE = gql`
  query getVote($id: Int!) {
    scoreBySong(song_id: $id)
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
    artist(artist_id: $artist_id) {
      _id
      artist_id
      name
      image_url
      total_score
      upvotes
      downvotes
      followers
    }
  }
`

export const GET_TRACKS = gql`
  query getTracks($artist_id: Int!) {
    albumsByArtist(artist_id: $artist_id)
  }
`

export const GET_SONG = gql`
  query getSong($song_id: Int!) {
    song(song_id: $song_id) {
      _id
      title
      lyrics
      total_score
      upvotes
      downvotes
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

export const GET_TOP_ARTISTS = gql`
  query getTopArtists {
    topArtists(limit: 5)
  }
`

export const SEARCH = gql`
  query search($query: String!) {
    lyricistSearch(query: $query) {
      query
      response
    }
  }
`
