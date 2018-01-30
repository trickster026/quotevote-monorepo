import React, { PureComponent } from "react"
import { withApollo } from "react-apollo"
import { SEARCH, GET_ARTIST_INFO, GET_TOP_ARTISTS } from "../../graphql/queries"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Menu, Search, Image, Container } from "semantic-ui-react"
import hihopImage from "../../assets/hiphop.png"
import { tokenValidator } from "../../actions/creators/loginActionCreator"

class HeaderComponent extends PureComponent {
  state = { search: "" }

  componentWillMount = () => {
    this.resetComponent()
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" })

  search = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.query({
          query: SEARCH,
          variables: { query: payload },
          refetchQueries: [
            {
              query: GET_ARTIST_INFO,
              variables: { artist_id: this.props.artistId }
            },
            {
              query: GET_TOP_ARTISTS
            }
          ]
        })
      }
    }
  }

  handleResultSelect = (e, { result }) => {
    const { artistId, songId } = result
    const { history } = this.props

    this.props.dispatch({
      type: "UPDATE_CURRENT_SONG",
      payload: {
        currentArtist: artistId,
        currentSongId: songId
      }
    })

    history.push(`/artist/${artistId}`)
  }

  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value })

    const { lyricistSearch } = (await this.search()(value)).data

    const results =
      lyricistSearch &&
      lyricistSearch.response.map(result => ({
        title: result.title,
        image: result.image,
        description: result.artistName,
        artistId: result.artistId,
        songId: result.songId
      }))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.setState({
        isLoading: false,
        results
      })
    }, 500)
  }

  render = () => {
    const { isLoading, value, results } = this.state

    const userId =
      "user" in this.props.login
        ? this.props.login.user._id
        : "59b006a2dba5fb0027f48c76"

    console.log("header props", this.props)

    return (
      <Menu attached="top" color="grey" size="huge" inverted>
        <Container>
          <Menu.Menu position="left">
            <Menu.Item as={Link} name="home" to="/">
              <Image src={hihopImage} />
            </Menu.Item>
            <Menu.Item as={Link} name="scoreboard" to="/artist/1">
              SCOREBOARD
            </Menu.Item>
            <Menu.Item as={Link} name="account" to={`/user/${userId}`}>
              ACCOUNT
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="sign-out"
              to={tokenValidator() ? "/logout" : "/login"}
            >
              {tokenValidator() ? "LOGOUT" : "LOGIN"}
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
              />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withApollo(withRouter(connect(mapStateToProps)(HeaderComponent)))
