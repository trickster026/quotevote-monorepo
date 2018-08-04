import React, { Component } from "react"
import {
  Segment,
  Header,
  Item,
  Label,
  Image,
  Pagination
} from "semantic-ui-react"
import { Query } from "react-apollo"
import { APP_TOKEN } from "../../utils/constants"
import gql from "graphql-tag"

import defaultImage from "../../assets/user_default.png"

const query = gql`
  query paginate($page: PaginationInput!) {
    paginate(page: $page) {
      total
      data
    }
  }
`

class TopAuthors extends Component {
  state = { page: 1, limit: 5 }

  handlePageChange = (event, { page }, total) => {
    if (this.state.page + 1 < total) this.setState({ page })
  }

  render = () => {
    const { page, limit } = this.state
    return (
      <Query
        query={query}
        variables={{ page: { page, limit, sort: "DESC", type: "Creator" } }}
        context={{ token: APP_TOKEN }}
      >
        {({ loading, error, data }) => {
          if (error)
            return (
              <Segment>
                <Header as="h1" style={{ fontSize: 24 }}>
                  Top Authors
                </Header>
                <Segment basic>Creators not available</Segment>
              </Segment>
            )
          if (loading) return <div>Loading...</div>

          const { paginate } = data

          return (
            <Segment>
              <Header as="h1" style={{ fontSize: 24 }}>
                Top Authors
              </Header>
              <Segment basic>
                <Item.Group>
                  {paginate.data.map((item, index) => (
                    <Item key={index}>
                      <Image
                        src={item.profileImageUrl || defaultImage}
                        width={50}
                        height={50}
                      />
                      <Item.Content>
                        <Item.Header>{` `}</Item.Header>
                        <Item.Description>
                          <Label color="teal">{item.name}</Label>
                          <Label color="teal">{`${
                            item.scoreDetails.upvotes
                          } / -${item.scoreDetails.downvotes}`}</Label>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
                <Pagination
                  defaultActivePage={1}
                  activePage={page}
                  totalPages={paginate.total / limit}
                  onPageChange={(e, data) =>
                    this.handlePageChange(e, data, paginate.total / limit)
                  }
                />
              </Segment>
            </Segment>
          )
        }}
      </Query>
    )
  }
}

export default TopAuthors
