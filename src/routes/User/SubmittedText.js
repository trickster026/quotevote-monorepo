import React, { Component } from "react"
import { List, Segment } from "semantic-ui-react"

import Module from "../../components/Layouts/Module"
import PropTypes from "prop-types"

class SubmittedText extends Component {
  static propTypes = {
    submissions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string
      })
    )
  }

  render = () => {
    const { submissions } = this.props
    return (
      <Module title="Submitted Text">
        <List ordered relaxed>
          {submissions ? (
            submissions.map(submission => (
              <List.Item key={submission.title}>
                <List.Content>
                  <List.Header>{submission.title}</List.Header>
                </List.Content>
              </List.Item>
            ))
          ) : (
            <Segment basic>No submissions yet!</Segment>
          )}
        </List>
      </Module>
    )
  }
}

export default SubmittedText
