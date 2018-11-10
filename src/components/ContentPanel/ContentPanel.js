import React, { Component } from "react"
import { Divider, Icon, Item } from "semantic-ui-react"
import FlexView from "react-flexview"
import PropTypes from "prop-types"
import moment from "moment"

class ContentPanel extends Component {
  static propTypes = {
    title: PropTypes.string,
    score: PropTypes.shape({
      upvotes: PropTypes.number,
      downvotes: PropTypes.number
    }),
    created: PropTypes.string
  }

  static defaultProps = {
    title: "Unknown Content",
    score: {
      upvotes: 0,
      downvotes: 0
    }
  }

  render = () => {
    const { title, score, created } = this.props
    console.log(this.props)
    return (
      <div style={{ margin: "20px" }}>
        <FlexView vAlignContent="center">
          <div style={{ fontFamily: "'Raleway', sans-serif" }}>
            <b style={{ fontWeight: 600 }}>{title} </b>
            <span
              style={{
                marginLeft: "200px",
                marginRight: "5px",
                float: "right"
              }}
            >
              <Icon name="chevron up" color="green" size="large" />
              <b> {score.upvotes}</b>
              <Icon name="chevron down" color="red" size="large" />
              <b> {score.downvotes}</b>
            </span>
          </div>
        </FlexView>
        <Divider />
        {this.props.children}
        <Divider />
        <Item.Extra>
          <span
            style={{
              color: "#d6d6d6",
              float: "right",
              marginLeft: "10px",
              fontWeight: 200
            }}
          >
            Posted {moment(created).format("MMM DD, YYYY")}
          </span>
        </Item.Extra>
      </div>
    )
  }
}

export default ContentPanel
