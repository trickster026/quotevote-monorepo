import React, { PureComponent } from "react"
import { Grid, Container, Segment, Header, Loader } from "semantic-ui-react"
import UserProfile from "./UserProfile"
import TopArtists from "../../components/TopArtists/topArtistsContainer"
import FantasyLabel from "./FantasyLabel"
import UserWall from "./UserWall/UserWall"
import VoteLogs from "./VoteLogs/voteLogsContainer"
import { string, number, shape } from "prop-types"
import Route404 from "../404"

class User extends PureComponent {
  static propTypes = {
    user: shape({
      name: string,
      points: number,
      vote_cast: number,
      image: string,
      followers: number,
      following: number
    }),
    fantasyLabels: shape({
      user_id: string,
      artist_id: number,
      name: string,
      score: number
    })
  }

  static defaultProps = {
    user: {
      user_id: "",
      name: "",
      points: 0,
      vote_cast: 0,
      image:
        "https://www.digitalwallonia.be/wp-content/plugins/evenement/src/front/assets/img//contact-default.png",
      followers: 0,
      following: 0
    },
    fantasyLabels: {}
  }

  render = () => {
    const {
      user,
      userFantasyLabels,
      searchUser,
      userId,
      loading,
      ...others
    } = this.props
    console.log(this.props)

    if (user && user.user_id !== "") {
      return (
        <Segment as={Container} basic>
          <Grid doubling stackable>
            <Grid.Row columns={2}>
              <Grid.Column width={8}>
                <UserProfile user={user} {...others} />
              </Grid.Column>
              <Grid.Column width={8}>
                <TopArtists />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <FantasyLabel fantasyLabels={userFantasyLabels} />
              </Grid.Column>
              <Grid.Column width={8}>
                <UserWall quotes={user.quotes} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <VoteLogs searchUser={searchUser} userId={userId} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
    } else if (loading) {
      return (
        <Segment as={Container} basic>
          <Header as="h4">
            <Loader active inline="centered" />
            {/*<Header.Content>User not exists :(</Header.Content>*/}
          </Header>
        </Segment>
      )
    } else {
      return <Route404 />
    }
  }
}

export default User
