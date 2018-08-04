import React, { Component } from "react"
import { Segment, Header, Dropdown } from "semantic-ui-react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"

class UserText extends Component {
  static propTypes = {
    texts: PropTypes.arrayOf({
      _id: PropTypes.string,
      text: PropTypes.string,
      title: PropTypes.string
    })
  }

  static defaultProps = {
    texts: []
  }

  handleSelectChange = (e, selection) => {
    this.setState({ selection })
    this.props.history.push(`/content/${selection.value}`)
  }

  render = () => {
    return (
      <Segment>
        <Header as="h1" style={{ fontSize: 24 }}>
          User's Text
        </Header>
        <Dropdown
          placeholder="Select Text"
          fluid
          selection
          options={this.props.texts}
          onChange={this.handleSelectChange}
        />
      </Segment>
    )
  }
}

export default withRouter(UserText)
