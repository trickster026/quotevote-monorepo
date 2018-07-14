import React, { PureComponent } from "react"
import { Segment, Container, Grid } from "semantic-ui-react"
import { Query } from "react-apollo"
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

class Content extends PureComponent {
  handleVoting = (event, data) => {
    console.log("data", data)
  }

  handleSelect = select => {
    console.log("select", select)
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
            return (
              <Segment as={Container} basic>
                <Grid doubling stackable>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <CreatorPanel
                        image={content.creator.profileImageUrl}
                        creator={content.creator.name}
                        score={content.score}
                        enableFollow
                      />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <VotingBoard
                        title={content.title}
                        // topOffset={this.state.voteProps.topOffset}
                        content={content.text}
                        onSelect={this.handleSelect}
                      >
                        {({ text }) => (
                          <ActionPopup
                            text={text}
                            // orientation={this.state.voteProps.orientation}
                            onVote={this.handleVoting}
                            // onAddComment={this.handleAddComment}
                            // onShareQuote={this.handleShareQuote}
                            // onOrientationChange={this.handleChangeOrientation}
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

export default Content
