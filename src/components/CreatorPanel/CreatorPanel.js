import React, { Component, Fragment } from "react"
import { Segment, Button, Image, Header, Label } from "semantic-ui-react"
import FlexView from "react-flexview"
import PropTypes from "prop-types"

class CreatorPanel extends Component {
  static propTypes = {
    creator: PropTypes.string,
    score: PropTypes.shape({
      upvotes: PropTypes.number,
      downvotes: PropTypes.number
    }),
    image: PropTypes.string,
    enableFollow: PropTypes.bool
  }

  static defaultProps = {
    creator: "Unknown Creator",
    score: {
      upvotes: 0,
      downvotes: 0
    },
    image:
      "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png",
    enableFollow: false
  }

  renderInformation = () => {
    const { enableFollow, creator, score } = this.props
    if (enableFollow) {
      const scoreValues = `Score ${score.upvotes - score.downvotes} (${
        score.upvotes
      } / -${score.downvotes})`
      return (
        <Fragment>
          <Header style={{ fontSize: 36, marginTop: 0, marginRight: 10 }}>
            {creator}
          </Header>
          <Label size="large" color="teal" style={{ marginRight: 10 }}>
            {scoreValues}
          </Label>
          <Button size="mini" basic color="teal">
            Follow
          </Button>
        </Fragment>
      )
    }
    return (
      <Header style={{ fontSize: 26, marginTop: 0 }}>
        {creator}
        <Header.Subheader style={{ fontSize: 22 }}>
          {`Score ${score.upvotes - score.downvotes} (${score.upvotes} / -${
            score.downvotes
          })`}
        </Header.Subheader>
      </Header>
    )
  }

  render = () => {
    const { image } = this.props
    return (
      <Segment style={{ paddingTop: 0, paddingBottom: 0 }}>
        <FlexView vAlignContent="center">
          <Image
            src={image}
            width={100}
            height={100}
            style={{ marginRight: 10 }}
          />
          {this.renderInformation()}
        </FlexView>
      </Segment>
    )
  }
}

export default CreatorPanel
