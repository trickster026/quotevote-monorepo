import React, { PureComponent } from "react"
import { Segment, Container, Grid } from "semantic-ui-react"
import { Query, withApollo } from "react-apollo"
import gql from "graphql-tag"

import CreatorPanel from "../../components/CreatorPanel/CreatorPanel"
import CommentsPanel from "../../components/CommentsPanel/CommentsPanel"
import VotingBoard from "../../components/VotingBoard/VotingBoard"
import ActionPopup from "../../components/VotingBoard/ActionPopup"

const getContent = gql`
  query content($contentId: String) {
    content(contentId: $contentId) {
      _id
      title
      text
      thumbnail
      creator {
        name
        profileImageUrl
      }
      score {
        upvotes
        downvotes
        total
      }
    }
  }
`

const addVote = gql`
  mutation addVote($vote: VoteInput!) {
    addVote(vote: $vote) {
      contentId
      type
      points
      startWordIndex
      endWordIndex
    }
  }
`

class Content extends PureComponent {
  handleVoting = (event, data) => {
    const { select } = this.state
    const { client, match } = this.props
    const vote = {
      ...data,
      startWordIndex: select.startIndex,
      endWordIndex: select.endIndex,
      contentId: match.params.contentId,
      creatorId: "5b2c956cebf67c36c0d8a147",
      userId: "59b003750e3766041440171f"
    }

    client.mutate({
      mutation: addVote,
      variables: { vote }
    })
  }

  handleAddComment = (event, comment) => {
    console.log("comment", comment)
  }

  handleShareQuote = (event, quote) => {
    console.log("quote", quote)
  }

  handleSelect = select => {
    this.setState({ select })
  }

  render = () => {
    const { contentId } = this.props.match.params
    if (!contentId) return <div>No content id passed!</div>
    const variables = { contentId }

    return (
      <Segment as={Container} basic>
        <Query query={getContent} variables={variables}>
          {({ loading, error, data: { content } }) => {
            if (loading) return <div>Getting data...</div>
            if (error) return <div>{`Error: ${error}`}</div>

            const { title, text, score } = content
            const creator = content.creator || {}
            return (
              <Segment as={Container} basic>
                <Grid doubling stackable>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <CreatorPanel
                        image={creator.profileImageUrl}
                        creator={creator.name}
                        score={score}
                        enableFollow
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <VotingBoard
                        title={title}
                        // topOffset={this.state.voteProps.topOffset}
                        content={text}
                        onSelect={this.handleSelect}
                      >
                        {({ text }) => (
                          <ActionPopup
                            text={text}
                            // orientation={this.state.voteProps.orientation}
                            onVote={this.handleVoting}
                            onAddComment={this.handleAddComment}
                            onShareQuote={this.handleShareQuote}
                            onOrientationChange={this.handleChangeOrientation}
                          />
                        )}
                      </VotingBoard>
                    </Grid.Column>
                    <Grid.Column>
                      <CommentsPanel />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            )
          }}
        </Query>
      </Segment>
    )
  }
}

export default withApollo(Content)
