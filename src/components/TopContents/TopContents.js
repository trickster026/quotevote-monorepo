import React, { Component } from "react"
import { Segment, Header, Item, Pagination, Label } from "semantic-ui-react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { APP_TOKEN } from "../../utils/constants"
import moment from "moment"

const query = gql`
  query paginate($page: PaginationInput!) {
    paginate(page: $page) {
      total
      data
    }
  }
`

class TopContents extends Component {
  state = { page: 1, limit: 5 }

  handlePageChange = (event, { activePage }, total) => {
    if (this.state.page + 1 < total) this.setState({ page: activePage })
  }

  render = () => {
    const { page, limit } = this.state
    return (
      <Query
        query={query}
        variables={{ page: { page, limit, type: "Content", sort: "DESC" } }}
        context={{ token: APP_TOKEN }}
      >
        {({ error, loading, data }) => {
          if (error) {
            return (
              <Segment>
                <Header as="h1" style={{ fontSize: 24 }}>
                  Top Contents
                </Header>
                <Segment basic>No available contents</Segment>
              </Segment>
            )
          }
          if (loading) return <div>Loading...</div>

          const { paginate } = data

          return (
            <Segment>
              <Header as="h1" style={{ fontSize: 24 }}>
                Top Contents
              </Header>
              <Segment basic>
                <Item.Group>
                  {paginate.data.map((content, index) => (
                    <Item key={index} style={{ marginBottom: 15 }}>
                      <Item.Content>
                        <Item.Header as="h6">
                          <Label color="teal">{index + 1}</Label>
                          <Label color="grey">{content.title}</Label>
                        </Item.Header>
                        <Item.Description>
                          <Label color="teal">
                            {content.creator
                              ? content.creator.name
                              : "Unknown Author"}
                          </Label>
                          <Label color="teal">
                            {moment(content.created).format("hh:mm:ss")}
                          </Label>
                          <Label color="teal">{`${
                            content.scoreDetails.upvotes
                          } / - ${content.scoreDetails.downvotes}`}</Label>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
              </Segment>
              <Pagination
                defaultActivePage={1}
                activePage={page}
                totalPages={paginate.total / limit}
                onPageChange={(e, data) =>
                  this.handlePageChange(e, data, paginate.total / limit)
                }
              />
            </Segment>
          )
        }}
      </Query>
    )
  }
}

export default TopContents
