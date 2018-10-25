import React, { PureComponent } from "react"
import { withApollo } from "react-apollo"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Button, Dropdown, Image, Menu, Search } from "semantic-ui-react"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"

import { GET_ARTIST_INFO, GET_TOP_ARTISTS } from "../../graphql/queries"
import {
  tokenValidator,
  userLogin
} from "../../actions/creators/loginActionCreator"
import gql from "graphql-tag"
import { APP_TOKEN } from "../../utils/constants"
import PropTypes from "prop-types"
import "./Header.css"

import headerImage from "../../assets/scoreBoard.png"

const search = gql`
  query search($text: String!) {
    searchContent(text: $text) {
      _id
      title
    }
    searchCreator(text: $text) {
      _id
      name
    }
  }
`

class HeaderComponent extends PureComponent {
  state = { search: "Search" }

  static propTypes = {
    login: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  UNSAFE_componentWillMount = () => {
    this.resetComponent()
  }

  handleResultSelect = (e, { result }) => {
    const { history } = this.props

    switch (result.__typename) {
      case "User":
        history.push(`${this.props.routing.url}/user/${result._id}`)
        break
      case "Content":
        history.push(`${this.props.routing.url}/content/${result._id}`)
        break
      default:
        break
    }
  }

  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value })

    const list = (await this.search()(value)).data
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.setState({
        isLoading: false,
        results: {
          contents: {
            name: "contents",
            results: list.searchContent
          },
          users: {
            name: "users",
            results: list.searchCreator.map(creator => ({
              ...creator,
              title: creator.name
            }))
          }
        }
      })
    }, 500)
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" })

  search = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.query({
          query: search,
          context: { token: APP_TOKEN },
          variables: { text: payload },
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

  renderProfileMenu = () => {
    const { avatar } = this.props.login.user
    return <Image avatar src={avatar} />
  }

  renderUserAccount = () => {
    const { login } = this.props
    const userId =
      login && "user" in login ? login.user._id : "59b006a2dba5fb0027f48c76"
    return (
      <Menu.Item>
        <Dropdown
          trigger={this.renderProfileMenu()}
          pointing="top right"
          icon={null}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              key="user"
              icon="user"
              as={Link}
              name="account"
              to={`/user/${userId}`}
              onClick={e => window.location.reload()}
              text="Account"
            />
            <Dropdown.Item
              key="add-content"
              icon="add"
              as={Link}
              name="add-content"
              to={this.props.routing.url + "/submit-content"}
              text="Add Content"
            />
            <Dropdown.Item
              as={Link}
              name="settings"
              to={`/settings`}
              text="Settings"
              icon="settings"
            />
            <Dropdown.Item
              as={Link}
              key="sign-out"
              name="sign-out"
              to={"/logout"}
              text="Sign Out"
              icon="sign out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    )
  }

  renderRightMenuItem = () => {
    const { isLoading, value, results } = this.state
    if (!tokenValidator()) return this.renderLoginMenuItem()
    return (
      <Menu.Menu position="right" stackable="true" className="item">
        <Menu.Item as={Link} name="home" to={"/home"} className="item-menu">
          HOME
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="top content"
          to={"/top-content"}
          className="item-menu"
        >
          TOP CONTENT
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="trending content"
          to={"/trending-content"}
          className="item-menu"
        >
          TRENDING CONTENT
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

        <Menu.Item>
          <Button circular color="orange" icon="bell" />
        </Menu.Item>
        {tokenValidator() && this.renderUserAccount()}
      </Menu.Menu>
    )
  }

  renderLoginMenuItem = () => {
    return (
      <Menu.Menu position="right">
        <Menu.Item name="sign-in">
          <Dropdown item text="LOGIN" pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item
                key="registered"
                icon="user"
                as={Link}
                name="registered"
                to={this.props.routing.url + "/login"}
                text="Registered"
              />
              <Dropdown.Item
                key="guest"
                icon="user secret"
                name="guest"
                text="Guest"
                onClick={this.createGuestUser}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    )
  }

  render = () => {
    const pathName = this.props.location.pathname

    if (pathName === this.props.routing.url + "/invite") return ""
    return (
      <Menu
        attached="top"
        color="black"
        size="huge"
        inverted
        stackable
        borderless
      >
        <Menu.Menu position="left">
          <Menu.Item>
            <Image
              floated="left"
              src={headerImage}
              size="medium"
              as={Link}
              to="/"
            />
          </Menu.Item>
        </Menu.Menu>
        {this.renderRightMenuItem()}
        <ToastContainer position="bottom-left" autoClose={2000} closeOnClick />
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
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(HeaderComponent)
  )
)
