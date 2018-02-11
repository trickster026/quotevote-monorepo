import React, { PureComponent } from "react"
import { graphql, compose, withApollo } from "react-apollo"
import { connect } from "react-redux"
import { GET_USER_INFO } from "../../graphql/queries"
import User from "../User/User"
import { FOLLOW_USERS, UNFOLLOW_USERS } from "../../graphql/mutations"

class UserContainer extends PureComponent {
  state = { artist: {} }

  componentWillReceiveProps = nextProps => {
    const _user = nextProps.user
    const showFollowButton = nextProps.loginUserId !== _user._id
    const isFollower = _user._followersId.find(x => x === nextProps.loginUserId)
    const user = {
      user_id: _user._id,
      name: _user.name,
      points: 0,
      vote_cast: 0,
      image: _user.avatar,
      followers: _user._followersId.length,
      following: _user._followingId.length,
      quotes: _user.quotes.slice(0, 5),
      isFollower: isFollower,
      showFollowButton
    }
    this.setState({ user })
  }

  handleFollow = async event => {
    const { user } = this.props
    const isFollower = user._followersId.find(x => x === this.props.loginUserId)
    if (user) {
      await this.props.client.mutate({
        mutation: isFollower ? UNFOLLOW_USERS : FOLLOW_USERS,
        variables: {
          user_id: user._id
        },
        refetchQueries: [
          {
            query: GET_USER_INFO,
            variables: { user_id: user._id }
          }
        ]
      })
    }
  }

  render = () => {
    return (
      <div>
        <User user={this.state.user} onFollow={this.handleFollow} />
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => {
  if (login && login.user) {
    return {
      loginUserId: login.user._id
    }
  }
}

export default withApollo(
  compose(
    connect(mapStateToProps),
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
)
