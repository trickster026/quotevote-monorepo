import React, { Component } from "react"
import { Menu, Icon } from "semantic-ui-react"
import PropTypes from "prop-types"

class MobileHeader extends Component {
  static propTypes = {
    onOptionClick: PropTypes.func
  }

  static defaultProps = {
    onOptionClick: () => {}
  }

  state = { toggle: false }

  handleOptionClick = event => {
    this.setState(
      prev => ({ toggle: !prev.toggle }),
      () => {
        this.props.onOptionClick(event, this.state.toggle)
      }
    )
  }

  render = () => {
    return (
      <Menu
        attached="top"
        color="grey"
        size="huge"
        inverted
        stackable
        borderless
      >
        <Menu.Item onClick={this.handleOptionClick}>
          <Icon name="bars" />
        </Menu.Item>
      </Menu>
    )
  }
}

export default MobileHeader
