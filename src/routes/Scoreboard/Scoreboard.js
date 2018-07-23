import React, { PureComponent } from "react"
import { Container, Segment, Grid, Header } from "semantic-ui-react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import TopContents from "../../components/TopContents/TopContents"
import TopAuthors from "../../components/TopAuthors/TopAuthors"
import { APP_TOKEN } from "../../utils/constants"

const query = gql`
  query getQuery($offset: Int!, $limit: Int!) {
    topContents(offset: $offset, limit: $limit) {
      title
      creator {
        name
      }
      score {
        upvotes
        downvotes
      }
    }
    topCreators(offset: $offset, limit: $limit) {
      profileImageUrl
      name
      score {
        upvotes
        downvotes
      }
    }
  }
`

class Scoreboard extends PureComponent {
  render = () => {
    return (
      <Query
        query={query}
        variables={{ offset: 0, limit: 10 }}
        context={{ token: APP_TOKEN }}
      >
        {({ data, error, loading }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>{error.message}</div>

          const { topContents, topCreators } = data
          return (
            <Segment as={Container} basic>
              <Grid>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Segment>
                      <Header
                        textAlign="center"
                        as="h1"
                        style={{ fontSize: 36 }}
                      >
                        Scoreboard Rankings
                      </Header>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2} stretched>
                  <Grid.Column>
                    <TopContents contents={topContents} />
                  </Grid.Column>
                  <Grid.Column>
                    <TopAuthors creators={topCreators} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          )
        }}
      </Query>
    )
  }
}

export default Scoreboard
