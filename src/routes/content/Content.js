import React, { PureComponent } from "react"
import { Segment, Container, Grid } from "semantic-ui-react"
import { Query, withApollo } from "react-apollo"
import { connect } from "react-redux"
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
        scoreDetails {
          upvotes
          downvotes
          total
        }
      }
      scoreDetails {
        upvotes
        downvotes
        total
      }
      comments {
        text
        hashtags
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

const addComment = gql`
  mutation addComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      _id
    }
  }
`

const addQuote = gql`
  mutation addQuote($quote: QuoteInput!) {
    addQuote(quote: $quote) {
      _id
    }
  }
`

class Content extends PureComponent {
  handleVoting = (event, data) => {
    const { select } = this.state
    const { client, match } = this.props
    const { contentId } = match.params

    const vote = {
      ...data,
      startWordIndex: select.startIndex,
      endWordIndex: select.endIndex,
      contentId,
      creatorId: this.props.creatorId,
      userId: this.props.userId,
      text: select.text
    }

    client.mutate({
      mutation: addVote,
      variables: { vote },
      refetchQueries: [
        {
          query: getContent,
          variables: { contentId }
        }
      ]
    })
  }

  handleAddComment = (event, comment) => {
    const { select } = this.state
    const { client, match, creatorId, userId } = this.props
    const { contentId } = match.params

    const HASHTAGS_REGEX = /#(\w|\d)+/g
    const hashtags = comment.match(HASHTAGS_REGEX)

    const newComment = {
      contentId,
      creatorId,
      userId,
      text: comment,
      startWordIndex: select.startIndex,
      endWordIndex: select.endIndex,
      hashtags
    }

    client.mutate({
      mutation: addComment,
      variables: { comment: newComment },
      refetchQueries: [
        {
          query: getContent,
          variables: { contentId }
        }
      ]
    })
  }

  handleShareQuote = (event, quote) => {
    const { client, userId, creatorId, match } = this.props
    const { contentId } = match.params

    const newQuote = {
      contentId,
      creatorId,
      userId,
      quote
    }

    client.mutate({
      mutation: addQuote,
      variables: { quote: newQuote }
    })
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
          {({ loading, error, data }) => {
            if (loading) return <div>Getting data...</div>
            if (error) return <div>{`Error: ${error}`}</div>

            const { title, text, scoreDetails, comments } = data.content
            const creator = data.content.creator || {}
            return (
              <Segment as={Container} basic>
                <Grid doubling stackable>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <CreatorPanel
                        image={creator.profileImageUrl}
                        creator={creator.name}
                        score={creator.scoreDetails}
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
                        score={scoreDetails}
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
                      <CommentsPanel comments={comments} />
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

const mapStateToProps = ({ login: { user } }) => ({
  creatorId: user.creatorId,
  userId: user._id
})

export default withApollo(connect(mapStateToProps)(Content))
