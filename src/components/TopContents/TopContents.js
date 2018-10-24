import React, { Component } from "react"
import { Segment, Header, Pagination, Grid } from "semantic-ui-react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { APP_TOKEN } from "../../utils/constants"
import moment from "moment"

import "./TopContents.css"

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
            <div className="top-contents-section">
              <h5>Top Contents</h5>
              <hr />
              {paginate.data.map((content, index) => (
                <Grid key={index}>
                  <Grid.Row>
                    <Grid.Column
                      width={2}
                      className="top-content-number-column"
                    >
                      <h1>
                        <sup>#</sup>
                        {index + 1}
                      </h1>
                    </Grid.Column>
                    <Grid.Column width={14}>
                      <div className="top-content">
                        <div className="top-content-text">
                          <div className="votes">
                            <div className="upvotes">
                              +{content.scoreDetails.upvotes}
                            </div>
                            <div className="downvotes" role="alert">
                              -{content.scoreDetails.downvotes}
                            </div>
                          </div>
                          <br />
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum
                          </p>
                        </div>
                        <div className="top-content-text-info">
                          <Grid.Row>
                            <Grid.Column>
                              <small>
                                <i>
                                  <a href="">{content.title}</a>
                                </i>
                                &nbsp; by{" "}
                                {content.creator
                                  ? content.creator.name
                                  : "Unknown Author"}{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {moment(content.created).format("hh:mm:ss")}{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                              </small>
                            </Grid.Column>
                          </Grid.Row>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ))}
              <br />
              <center>
                <Pagination
                  defaultActivePage={1}
                  activePage={page}
                  totalPages={paginate.total / limit}
                  onPageChange={(e, data) =>
                    this.handlePageChange(e, data, paginate.total / limit)
                  }
                />
              </center>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default TopContents
