import React, { PureComponent } from "react"
import { graphql, compose } from "react-apollo"
import { GET_USER_INFO } from "../../graphql/queries"
import User from "../User/User"

class UserContainer extends PureComponent {
  state = { artist: {} }

  componentWillReceiveProps = nextProps => {
    console.log("received props", nextProps)
    const _user = nextProps.user
    const user = {
      name: _user.name,
      points: 0,
      vote_cast: 0,
      image: _user.avatar,
      followers: 65,
      following: 24
    }
    this.setState({ user })
  }

  render = () => {
    return (
      <div>
        <User user={this.state.user} />
      </div>
    )
  }
}

export default compose(
  graphql(GET_USER_INFO, {
    options: ownProps => {
      const userId = ownProps && ownProps.match.params.userId
      return {
        variables: {
          user_id: userId
        }
      }
    },
    props: ({ data: { user } }) => ({
      user: user
    })
  })
)(UserContainer)
