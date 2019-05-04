import React, { Component } from "react"
import {
  Segment,
  Header,
  Icon,
  Input,
  Grid,
  Button,
  Placeholder
} from "semantic-ui-react"
import "./ActivityFeed.css"
import { Query } from "react-apollo"
import { APP_TOKEN } from "../../utils/constants"
import moment from "moment"
import gql from "graphql-tag"

const query = gql`
  query activities($limit: Int!, $offset: Int!) {
    activities(limit: $limit, offset: $offset) {
      _id
      event
      data
    }
  }
`

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const ActivityRows = props => (
  <div className="activity-rows">
    <Grid>
      <Grid.Column width={1}>
        <div className="period">
          <strong>{props.dateCreated}</strong>
        </div>
      </Grid.Column>
      <Grid.Column width={13}>
        <fieldset style={{ borderColor: props.color }}>
          <legend className="legend" style={{ color: props.color }}>
            {props.preTitletext} {props.name}
          </legend>
          <Grid>
            <Grid.Column width={13}>
              <p>{props.content}</p>
            </Grid.Column>
            <Grid.Column float="right" width={3}>
              <strong style={{ color: "green" }}>+{getRandomInt(1000)}</strong>{" "}
              / <strong style={{ color: "red" }}>-{getRandomInt(1000)}</strong>
            </Grid.Column>
          </Grid>
        </fieldset>
      </Grid.Column>
      <Grid.Column width={2} className="row-margin">
        <Icon link name="bookmark" size="large" />
        <Icon link name="sign-out alternate" size="large" />
      </Grid.Column>
    </Grid>
  </div>
)

class ActivityFeed extends Component {
  state = { offset: 0, limit: 5 }

  handlePageMove = (e, direction) => {
    this.setState(prev => ({
      offset: direction === "right" ? prev.offset + 1 : prev.offset - 1
    }))
  }

  renderStream = () => {
    const { limit, offset } = this.state
    return (
      <Query
        query={query}
        variables={{ limit, offset }}
        context={{ token: APP_TOKEN }}
      >
        {({ error, loading, data: { activities } }) => {
          if (error) return <div>{error.message}</div>
          if (loading)
            return (
              <Segment style={{ margin: "0px" }} loading>
                <Placeholder fluid>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Segment>
            )

          return (
            <Segment style={{ margin: "0px" }}>
              <div style={{ paddingBottom: "25px" }}>
                {activities.map((act, index) => {
                  console.log({ act })
                  switch (act.event) {
                    case "POSTED":
                      return (
                        <ActivityRows
                          key={index}
                          id={act.data._id}
                          content={act.data.title}
                          color="#0A054A"
                          dateCreated={moment(act.data.created).format(
                            "hh:mm:ss"
                          )}
                          points={act.data.score}
                          name={act.data.creator.name}
                          preTitletext={"Posted by"}
                        />
                      )
                    case "QUOTED":
                      return (
                        <ActivityRows
                          key={index}
                          id={act.data._id}
                          content={act.data.quote}
                          color="#0094FF"
                          dateCreated={moment(act.data.created).format(
                            "hh:mm:ss"
                          )}
                          points="0"
                          name={act.data.creator.name}
                          preTitletext={"Quoted by"}
                        />
                      )
                    case "VOTED":
                      return (
                        <ActivityRows
                          key={index}
                          id={act.data._id}
                          content={act.data.content.title}
                          color="#02D57C"
                          dateCreated={moment(act.data.created).format(
                            "hh:mm:ss"
                          )}
                          points={act.data.points}
                          name={act.data.creator.name}
                          preTitletext={"Voted by"}
                        />
                      )
                    case "COMMENTED":
                      return (
                        <ActivityRows
                          key={index}
                          id={act.data._id}
                          content={act.data.text}
                          color="#F8B300"
                          dateCreated={moment(act.data.created).format(
                            "hh:mm:ss"
                          )}
                          points={act.data.content.score}
                          name={act.data.creator.name}
                          preTitletext={"Commented by"}
                        />
                      )
                    default:
                      break
                  }
                  return null
                })}
                {activities.length <= 0 && <div>No more activities</div>}
                <div style={{ marginTop: "5px" }}>
                  {offset > 0 && (
                    <Button
                      icon
                      labelPosition="left"
                      floated="left"
                      size="tiny"
                      onClick={e => this.handlePageMove(e, "left")}
                    >
                      Prev
                      <Icon name="left arrow" />
                    </Button>
                  )}
                  {activities.length > 0 && (
                    <Button
                      icon
                      labelPosition="right"
                      floated="right"
                      size="tiny"
                      onClick={e => this.handlePageMove(e, "right")}
                    >
                      Next
                      <Icon name="right arrow" />
                    </Button>
                  )}
                </div>
              </div>
            </Segment>
          )
        }}
      </Query>
    )
  }

  render() {
    return (
      <div>
        <div className="activity">
          <Header className="textFont" size="huge" textAlign="center" inverted>
            Activity Feed
          </Header>
          <div style={{ marginTop: "-45px" }}>
            <Icon link name="calendar" size="big" inverted />
            <Icon link name="filter" size="big" inverted />
            <Input icon="search" placeholder="Search..." />
          </div>
        </div>
        {this.renderStream()}
      </div>
    )
  }
}

export default ActivityFeed
