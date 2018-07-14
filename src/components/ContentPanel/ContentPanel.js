import React, { Component } from "react"
import { Header, Label, Segment } from "semantic-ui-react"
import FlexView from "react-flexview"
import PropTypes from "prop-types"

class ContentPanel extends Component {
  static propTypes = {
    title: PropTypes.string,
    score: PropTypes.shape({
      upvotes: PropTypes.number,
      downvotes: PropTypes.number
    })
  }

  static defaultProps = {
    title: "Unknown Content",
    score: {
      upvotes: 0,
      downvotes: 0
    }
  }

  render = () => {
    const { title, score } = this.props
    const total = `Score ${score.upvotes + score.downvotes} (${
      score.upvotes
    } / -${score.downvotes})`
    return (
      <Segment>
        <FlexView vAlignContent="center">
          <Header style={{ fontSize: 24 }}>{title}</Header>
          <Label size="mini" color="teal">
            {total}
          </Label>
        </FlexView>
        {this.props.children}
      </Segment>
    )
  }
}

export default ContentPanel
