import React, { PureComponent } from "react"
import { withApollo } from "react-apollo"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Container, Image, Menu, Search, Dropdown } from "semantic-ui-react"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"

import { GET_ARTIST_INFO, GET_TOP_ARTISTS, SEARCH } from "../../graphql/queries"
import hiphopScoreboardLogo from "../../assets/hiphop.png"
import {
  tokenValidator,
  userLogin
} from "../../actions/creators/loginActionCreator"
import { APP_TOKEN } from "../../utils/constants"
import PropTypes from "prop-types"

class HeaderComponent extends PureComponent {
  state = { search: "" }

  static propTypes = {
    login: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentWillMount = () => {
    this.resetComponent()
  }

  handleResultSelect = (e, { result }) => {
    const { artistId, songId, userId } = result
    const { history } = this.props

    if (userId) {
      history.push(`${this.props.routing.url}/user/${userId}`)
    } else {
      this.props.updateCurrentSong(artistId, songId)
      history.push(`${this.props.routing.url}/artist/${artistId}`)
    }
  }

  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value })

    const { lyricistSearch } = (await this.search()(value)).data

    const lyricistData =
      lyricistSearch &&
      lyricistSearch.response[0].category.results.map(result => ({
        title: result.title,
        image: result.image,
        description: result.artistName,
        artistId: result.artistId,
        songId: result.songId,
        userId: 0
      }))

    const usersData =
      lyricistSearch &&
      lyricistSearch.response[1].category.results.map(result => ({
        title: result.name,
        image: result.avatar,
        description: "",
        userId: result._id,
        songId: 0,
        artistId: 0
      }))

    let results = {
      users: {
        name: "Users",
        results: usersData
      },
      lyricist: {
        name: "Songs",
        results: lyricistData
      }
    }

    if (!usersData.length) delete results.users

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.setState({
        isLoading: false,
        results
      })
    }, 500)
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" })

  search = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.query({
          query: SEARCH,
          context: { token: APP_TOKEN },
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

  // TODO move this out of this component to maintain code reliability.
  createGuestUser = async () => {
    const guest = await axios.post(process.env.REACT_APP_SERVER + "/guest")
    this.props.guestLogin(
      guest.data.username,
      guest.data.username,
      this.props.history
    )
    await toast.success("Successfully login as Guest!")
  }

  renderUserAccount = () => {
    const { login } = this.props
    const userId =
      login && "user" in login ? login.user._id : "59b006a2dba5fb0027f48c76"
    return (
      <Menu.Item>
        <Dropdown item text="ACCOUNT" pointing>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              name="account"
              to={`${this.props.routing.url}/user/${userId}`}
            >
              User Scoreboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Link}
              name="settings"
              to={`${this.props.routing.url}/settings`}
            >
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as={Link}
              name="sign-out"
              to={this.props.routing.url + "/logout"}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    )
  }

  renderRightMenuItem = () => {
    const { isLoading, value, results } = this.state
    if (!tokenValidator()) return this.renderLoginMenuItem()
    return (
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          name="user-content"
          to={this.props.routing.url + "/submit-content"}
        >
          SUBMIT YOUR OWN TEXT
        </Menu.Item>
        <Menu.Item>
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
        </Menu.Item>
      </Menu.Menu>
    )
  }

  renderLoginMenuItem = () => {
    return (
      <Menu.Item name="sign-in">
        <Dropdown item text="LOGIN" pointing>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              name="registered"
              to={this.props.routing.url + "/login"}
            >
              Login as Registered User
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item name="guest" onClick={this.createGuestUser}>
              Login as Guest User
            </Dropdown.Item>
            <Dropdown.Divider />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    )
  }

  render = () => {
    const pathName = this.props.location.pathname

    if (pathName === this.props.routing.url + "/invite") return ""
    return (
      <Menu
        attached="top"
        color="grey"
        size="huge"
        inverted
        stackable
        borderless
      >
        <Container>
          <Menu.Menu position="left">
            <Menu.Item as={Link} name="home" to={this.props.routing.url}>
              <Image src={hiphopScoreboardLogo} />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="scoreboard"
              to={this.props.routing.url + "/scoreboard"}
            >
              SCOREBOARD
            </Menu.Item>
            {tokenValidator() && this.renderUserAccount()}
          </Menu.Menu>
          {this.renderRightMenuItem()}
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            closeOnClick
          />
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => ({
  guestLogin: (username, password, history) => {
    dispatch(userLogin(username, password, history))
  },
  updateCurrentSong: (artistId, songId) =>
    dispatch({
      type: "UPDATE_CURRENT_SONG",
      payload: {
        currentArtist: artistId,
        currentSongId: songId
      }
    })
})

export default withApollo(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent))
)
