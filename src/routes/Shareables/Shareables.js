import React, { Component, Fragment } from "react"
import { Container, Segment, Grid } from "semantic-ui-react"
import { Query } from "react-apollo"
import { connect } from "react-redux"
import gql from "graphql-tag"

import VotingBoard from "../../components/VotingBoard/VotingBoard"
import ActionPopup from "../../components/VotingBoard/ActionPopup"

const GET_TEXT = gql`
  query text($code: String!, $authorId: String!) {
    text(code: $code, author_id: $authorId) {
      title
      text
      authorId
      url
      created
    }
    user(user_id: $authorId) {
      name
    }
  }
`

class Shareables extends Component {
  state = { selection: {} }

  handleSelect = selection => {
    this.setState({ selection })
  }

  handleVote = (event, vote) => {
    console.log("voted", vote)
  }

  handleAddComment = (event, comment) => {
    console.log("added comment", comment)
  }

  handleShareQuote = (event, quote) => {
    console.log("shared quote", quote)
  }

  render = () => {
    return (
      <Container>
        <Segment basic>
          <Query
            query={GET_TEXT}
            variables={{
              code: this.props.match.params.code,
              authorId: this.props.authorId
            }}
          >
            {({ data: { text, user }, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>{error}</div>

              if (text) {
                return (
                  <Fragment>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>Submitted by: {user.name}</Grid.Column>
                        <Grid.Column>Total Points: 0</Grid.Column>
                        <Grid.Column>Upvotes: 0</Grid.Column>
                        <Grid.Column>Downvotes: 0</Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <VotingBoard
                      title={text.title}
                      content={text.text}
                      onSelect={this.handleSelect}
                    >
                      {({ text }) => (
                        <ActionPopup
                          text={text}
                          onVote={this.handleVote}
                          onAddComment={this.handleAddComment}
                          onShareQuote={this.handleShareQuote}
                        />
                      )}
                    </VotingBoard>
                  </Fragment>
                )
              }
            }}
          </Query>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ({ login: { user: { _id } } }) => ({ authorId: _id })

export default connect(mapStateToProps)(Shareables)
