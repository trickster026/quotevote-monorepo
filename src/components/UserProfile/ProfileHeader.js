import React, { PureComponent } from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Container, Grid, Image, Modal, Search } from "semantic-ui-react";
import faker from "faker";
import gql from "graphql-tag";
import { APP_TOKEN } from "../../utils/constants";
import UserText from "../UserText/UserText";
import "./ProfileHeader.css";
import PropTypes from "prop-types";
import classnames from "classnames";

const search = gql`
  query search($text: String!) {
    searchCreator(text: $text) {
      _id
      name
      avatar
    }
  }
`;

class ProfileHeader extends PureComponent {
  state = {
    value: "Search Profile",
    results: [],
    noResult: false
  };

  handleFocus = (e, { value }) => {
    if (value === "Search Profile") {
      this.setState({ value: "" });
    }
  };
  handleBlur = () => {
    if (this.state.value.length === 0) {
      this.setState({ value: "Search Profile", isLoading: false });
    }
  };
  handleResultSelect = (e, { result }) => {
    const path = `/user/${result._id}`;
    this.props.history.push(path);
  };
  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value });
    if (value.length === 0) {
      this.setState({ results: [], isLoading: false });
    }
    const list = (await this.search()(value)).data;
    let searchCreator = [];
    list.searchCreator.map(value => {
      if (value.name !== "guest") searchCreator.push(value);
      return 0;
    });
    if (searchCreator.length !== 0) {
      setTimeout(() => {
        this.setState({
          isLoading: false,
          results: {
            users: {
              name: "Users",
              results: searchCreator.map(creator => ({
                ...creator,
                title: creator.name,
                image: creator.avatar
              }))
            }
          }
        });
      }, 100);
    } else {
      this.setState({ noResult: true, isLoading: false, results: [] });
    }
  };

  search = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.query({
          query: search,
          context: { token: APP_TOKEN },
          variables: { text: payload }
        });
      };
    }
  };

  render() {
    const { user, texts } = this.props;
    const { value, results, isLoading, noResult } = this.state;
    let scoreValues = "Score 8 (10 / -2)";
    const { scoreDetails } = user;
    if (scoreDetails) {
      scoreValues = `Score ${scoreDetails.upvotes -
      scoreDetails.downvotes} (${scoreDetails.upvotes} / -${
        scoreDetails.downvotes
        })`;
    }

    const hideProfileMenuButtons = this.props.login.user._id === user._id;
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
                value={value}
                results={results}
                showNoResults={noResult}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onSearchChange={this.handleSearchChange}
                onResultSelect={this.handleResultSelect}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Container className={classnames("button-group", hideProfileMenuButtons ? "button-hide" : "button-visible")}
                   textAlign="center">
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
                <UserText texts={texts}/>
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
    );
  }
}

const mapStateToProps = state => {
  return state;
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired
};

export default withApollo(
  withRouter(connect(mapStateToProps)(ProfileHeader)));
