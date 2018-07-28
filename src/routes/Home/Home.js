import React, { Component } from "react"
import { Grid, Segment, Container, Header } from "semantic-ui-react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import { APP_TOKEN } from "../../utils/constants"
import TopContents from "../../components/TopContents/TopContents"
import TopAuthors from "../../components/TopAuthors/TopAuthors"
import QuoteStream from "../../components/QuoteStream/QuoteStream"

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

class Home extends Component {
  render = () => {
    return (
      <Segment as={Container} basic>
        <Segment>
          <Header textAlign="center" as="h1" style={{ fontSize: 36 }}>
            Scoreboard Analytics Dashboard
          </Header>
        </Segment>

        <Query
          query={query}
          variables={{ offset: 0, limit: 10 }}
          context={{ token: APP_TOKEN }}
        >
          {({ loading, error, data: { topContents, topCreators } }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>{error.message}</div>
            return (
              <Grid>
                <Grid.Row columns={2} stretched>
                  <Grid.Column>
                    <Segment>
                      <Header as="h1">Welcome</Header>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed tristique mi vel mattis venenatis. Quisque rhoncus,
                      sem venenatis tristique blandit, nisi lacus luctus elit,
                      quis sollicitudin orci elit ac purus. Duis tristique ex in
                      placerat euismod. Maecenas libero turpis, pharetra id
                      semper eget, pretium at nisi. Morbi scelerisque ac velit
                      sed sodales. Morbi ac urna efficitur purus malesuada
                      faucibus eu et dolor. Vivamus eleifend, odio at dignissim
                      volutpat, tellus lorem cursus leo, vitae efficitur elit
                      arcu sed felis. Fusce accumsan at dui at finibus. Integer
                      molestie condimentum nunc ut vehicula. Vestibulum sed
                      pulvinar erat. Nunc porttitor est sit amet turpis lacinia,
                      at iaculis ex rutrum.
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <QuoteStream />
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
            )
          }}
        </Query>
      </Segment>
    )
  }
}

export default Home
