import React, { Component } from "react"
import { Grid, Pagination, Placeholder, Segment } from "semantic-ui-react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { APP_TOKEN } from "../../utils/constants"
import moment from "moment"

import "./TopContents.css"
import PropTypes from "prop-types"

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

  renderNoData = (
    <div className="top-contents-section">
      <h5>Top Contents</h5>
      <hr />
      <Segment basic>No available contents</Segment>
    </div>
  )

  render = () => {
    const { page, limit } = this.state
    const { pageFilter } = this.props

    return (
      <Query
        query={query}
        variables={{
          page: {
            page,
            limit,
            type: "Content",
            sort: "ASC",
            ...pageFilter
          }
        }}
        context={{ token: APP_TOKEN }}
      >
        {({ error, loading, data }) => {
          if (error) {
            return this.renderNoData
          }
          if (loading)
            return (
              <div className="top-contents-section">
                <h5>Top Contents</h5>
                <hr />
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <Placeholder className="top-content-number-column" />
                    </Grid.Column>
                    <Grid.Column width={14}>
                      <div className="top-content">
                        <div className="top-content-text">
                          <br />
                          <p>
                            <Placeholder>
                              <Placeholder.Line length="short" />
                              <Placeholder.Line length="medium" />
                              <Placeholder.Line length="long" />
                              <Placeholder.Line length="very long" />
                              <Placeholder.Line length="very long" />
                              <Placeholder.Line length="very long" />
                              <Placeholder.Line length="long" />
                              <Placeholder.Line length="very long" />
                              <Placeholder.Line length="long" />
                            </Placeholder>
                          </p>
                        </div>
                        <div className="top-content-text-info">
                          <Placeholder>
                            <Placeholder.Line length="full" />
                          </Placeholder>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            )

          const { paginate } = data
          console.log({ paginate })
          if (!paginate.data.length) return this.renderNoData
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
                        {(page - 1) * 5 + index + 1}
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
                          <p>{content.text}</p>
                        </div>
                        <div className="top-content-text-info">
                          <Grid.Row>
                            <Grid.Column>
                              <small>
                                <i>
                                  <a href="/scoreboard">{content.title}</a>
                                </i>
                                &nbsp; by{" "}
                                {content.creator
                                  ? content.creator.name
                                  : "Unknown Author"}{" "}
                              </small>
                            </Grid.Column>
                          </Grid.Row>
                        </div>
                        <div className="top-content-stamps">
                          <div className="top-content-date-stamp">
                            <i className="fas fa-clock" />
                            <small>
                              &nbsp;&nbsp;
                              {moment(content.created).format(
                                "MMM DD, YYYY hh:mm:ss"
                              )}
                            </small>
                          </div>
                          <div className="top-content-icon-stamps">
                            <i className="fa fa-heart" />
                            &nbsp;
                            <i className="fab fa-facebook" />
                            &nbsp;
                            <i className="fas fa-quote-right" />
                            &nbsp;
                          </div>
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

TopContents.propTypes = {
  pageFilter: PropTypes.object.isRequired
}

export default TopContents
