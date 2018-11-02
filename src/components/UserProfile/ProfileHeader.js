import React, { PureComponent } from "react"
import { withApollo } from "react-apollo"
import {
  Grid,
  Image,
  Search,
  Button,
  Container,
  Modal
} from "semantic-ui-react"
import faker from "faker"
import gql from "graphql-tag"
import { APP_TOKEN } from "../../utils/constants"
import UserText from "../UserText/UserText"
import "./ProfileHeader.css"

const search = gql`
  query search($text: String!) {
    searchCreator(text: $text) {
      _id
      name
      avatar
      email
    }
  }
`

class ProfileHeader extends PureComponent {
  state = {
    value: "Search Profile",
    results: [],
    noResult: false
  }

  handleFocus = (e, { value }) => {
    if (value === "Search Profile") {
      this.setState({ value: "" })
    }
  }
  handleBlur = () => {
    if (this.state.value.length === 0) {
      this.setState({ value: "Search Profile", isLoading: false })
    }
  }
  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value })
    if (value.length === 0) {
      this.setState({ results: [], isLoading: false })
    }
    const list = (await this.search()(value)).data
    let searchCreator = []
    list.searchCreator.map(value => {
      if (value.name !== "guest") searchCreator.push(value)
      return 0
    })
    if (searchCreator.length !== 0) {
      setTimeout(() => {
        this.setState({
          isLoading: false,
          results: {
            users: {
              name: "Users",
              results: searchCreator.map(creator => ({
                title: creator.name,
                image: creator.avatar,
                description: creator.email
              }))
            }
          }
        })
      }, 100)
    } else {
      this.setState({ noResult: true, isLoading: false, results: [] })
    }
  }

  search = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.query({
          query: search,
          context: { token: APP_TOKEN },
          variables: { text: payload }
        })
      }
    }
  }

  render() {
    const { user, texts } = this.props
    const { value, results, isLoading, noResult } = this.state
    let scoreValues = "Score 8 (10 / -2)"
    if (user) {
      scoreValues = `Score ${user.scoreDetails.upvotes -
        user.scoreDetails.downvotes} (${user.scoreDetails.upvotes} / -${
        user.scoreDetails.downvotes
      })`
    }
    return (
      <div>
        <Grid columns={16} className="profile-header">
          <Grid.Row columns={3}>
            <Grid.Column floated="left" verticalAlign="bottom" stretched>
              <div className="profile-card">
                <Image
                  src={!user ? faker.internet.avatar() : user.avatar}
                  size="small"
                  circular
                  floated="left"
                />
                <h2>
                  {!user
                    ? `${faker.name.firstName()} ${faker.name.lastName()}`
                    : user.name}
                </h2>
                <p>{scoreValues}</p>
              </div>
            </Grid.Column>
            <Grid.Column
              floated="right"
              verticalAlign="bottom"
              textAlign="right"
            >
              <Search
                category
                loading={isLoading}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onSearchChange={this.handleSearchChange}
                value={value}
                results={results}
                showNoResults={noResult}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container className="button-group" textAlign="center">
          <Button basic>INFO</Button>
          <Modal
            trigger={
              <Button basic color="green">
                POSTED CONTENT
              </Button>
            }
          >
            <Modal.Header>Posted Contents</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <UserText texts={texts} />
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <Button basic color="teal">
            SEND MESSAGE
          </Button>
          <Button basic color="red">
            REPORT
          </Button>
          <Button color="twitter">FOLLOW</Button>
        </Container>
      </div>
    )
  }
}

export default withApollo(ProfileHeader)
