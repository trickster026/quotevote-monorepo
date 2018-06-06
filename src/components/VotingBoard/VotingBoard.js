import React, { Component } from "react"
import { Dimmer, Loader, Container } from "semantic-ui-react"

import SelectionPopover from "./SelectionPopover"
import Module from "../Layouts/Module"
import PropTypes from "prop-types"

import "./VotingBoard.css"

class VotingBoard extends Component {
  state = { open: false, selection: {} }

  static propTypes = {
    title: PropTypes.string,
    topOffset: PropTypes.number,
    content: PropTypes.string,
    children: PropTypes.func
  }

  static defaultProps = {
    title: "Voting Board",
    topOffset: 60
  }

  handleSelect = select => {
    const text = select.toString()
    const selection = {
      text,
      startIndex: select.anchorOffset,
      endIndex: select.anchorOffset + text.length
    }

    if (text.length > 0 && this.props.onSelect) {
      this.setState({ open: true, selection })
      this.props.onSelect(selection)
    } else {
      this.setState({ selection: {} })
    }
  }

  handleDeselect = select => {
    this.setState({ open: false })
  }

  renderLoader = () => (
    <Dimmer active>
      <Loader size="small">Loading Lyrics</Loader>
    </Dimmer>
  )

  renderContent = () => {
    if (!this.props.content) return null
    return (
      <Container style={{ position: "relative" }}>
        <div data-selectable>
          <p className="voting_board-content">{this.props.content}</p>
        </div>
        <SelectionPopover
          showPopover={this.state.open}
          topOffset={this.props.topOffset}
          onSelect={this.handleSelect}
          onDeselect={this.handleDeselect}
        >
          {this.props.children({ ...this.state.selection })}
        </SelectionPopover>
      </Container>
    )
  }

  render = () => {
    return (
      <Module title={this.props.title}>
        {this.renderContent() || this.renderLoader()}
      </Module>
    )
  }
}

export default VotingBoard
