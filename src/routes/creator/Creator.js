import React, { PureComponent } from "react"
import { Segment, Container } from "semantic-ui-react"
// import gql from "graphql-tag"

class Creator extends PureComponent {
  render = () => {
    return (
      <Segment as={Container} basic>
        {this.props.match.params.creatorId}
      </Segment>
    )
  }
}

export default Creator
