import React, { Component } from "react"
import styles from "./LightComponent.module.css"
import FontAwesome from "react-fontawesome"
import { Input, Button } from "semantic-ui-react"
import { CONTENT_REGEX } from "../../../utils/parser"

export default class LightComponent extends Component {
  state = {
    expand: false,
    greenValue: "",
    yellowValue: "",
    redValue: "",
    purpleValue: "",
    comment: "",
    commentSubmitted: false
  }

  // Handle the upvote or downvote
  handleVote = (type, event) => {
    console.log("VOTE", this.props)
    this.props.onVote(event, {
      type,
      points: this.props.text.match(CONTENT_REGEX).length
    })
  }

  // Handle the purple icon on click event
  purpleClicked() {
    this.setState({ redArrow: "Purple Clicked" })
  }

  // Gets the value of the users comment when they enter any value
  handleOnChange = (e, comment) => {
    this.setState({ comment })
  }

  // A method to save or do whatever with the users comment
  handleAddComment = event => {
    console.log("comm", this.state)
    this.props.onAddComment(event, this.state.comment.value)
    /* setTimeout(() => {
		  this.setState({ isCommenting: false })
		}, 500) */
    this.resetState()
  }

  resetState() {
    console.log("reset")
    this.setState({
      greenValue: "",
      yellowValue: "",
      redValue: "",
      purpleValue: "",
      comment: "",
      expand: false,
      commentSubmitted: false
    })
  }

  // options are 'expand' and 'default'
  toggleAnimationState(state) {
    console.log({ state })
    let expand = state === "expand" ? true : false
    this.setState({ expand })
  }

  render() {
    const { expand, comment } = this.state
    console.log("rendered comment", comment)
    return (
      <div
        className={`${styles["light-container"]} ${
          expand ? styles["expand"] : ""
        } `}
        /* onMouseLeave={ () => this.toggleAnimationState('default') } */
      >
        <div className={styles["light-container-inner"]}>
          <div
            className={`${styles["light-inner"]} ${styles["vertical-align"]} `}
          >
            {/* Green Button */}
            <div
              className={`${styles["light-circ"]}  ${styles["c1"]}`}
              onClick={this.handleVote.bind(this, "upvote")}
            >
              <FontAwesome
                className={` ${styles["overwrite-fas"]} ${styles["fas"]}`}
                name="arrow-up"
                size="2x"
              />
              <div className={styles["c1i"]} />
            </div>

            {/* Yellow Button */}
            <div
              className={`${styles["light-circ"]} ${styles["c2"]}`}
              onClick={() => {
                this.toggleAnimationState("expand")
              }}
            >
              <FontAwesome
                className={`${styles["overwrite-fas"]} ${styles["fas"]}`}
                name="chevron-circle-down"
                size="2x"
              />
              <div className={styles["c2i"]} />
            </div>

            {/* Red Button */}
            <div
              className={`${styles["light-circ"]} ${styles["c3"]}`}
              onClick={this.handleVote.bind(this, "downvote")}
            >
              <FontAwesome
                className={`${styles["overwrite-fas"]} ${styles["fas"]}`}
                name="arrow-down"
                size="2x"
              />
              <div className={styles["c3i"]} />
            </div>

            {/* Purple Button */}
            <div
              className={`${styles["light-circ"]} ${styles["c4"]}  ${
                expand ? styles["show-quotes-option"] : ""
              } `}
              onClick={this.purpleClicked}
            >
              <FontAwesome
                className={`${styles["overwrite-fas"]} ${styles["fas"]}`}
                name="quote-right"
                size="2x"
              />
              <div className={styles["c4i"]} />
            </div>
          </div>
        </div>

        {/* Comment input and save Button */}
        <div className={`${styles["cmt"]} ${expand ? styles["show-cmt"] : ""}`}>
          <div className="ui action input">
            <Input type="text" onChange={this.handleOnChange} action />
            <Button
              basic
              color="grey"
              content={
                <FontAwesome className={styles["fas"]} name="comment-alt" />
              }
              onClick={this.handleAddComment}
            />
          </div>
        </div>
      </div>
    )
  }
}
