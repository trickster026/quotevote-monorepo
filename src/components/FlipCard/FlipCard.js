import React, { Component } from "react"
import "./FlipCard.css"

class FlipCard extends Component {
  state = {
    flip: true,
    content: this.props.content,
    prevContent: this.props.content
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.content !== this.state.content) {
      this.setState(prev => ({ flip: !prev.flip }))
      setTimeout(() => {
        this.setState(prev => ({
          flip: !prev.flip,
          content: nextProps.content,
          prevContent: prev.content
        }))
      }, 500)
    }
  }

  render() {
    const flipContainerStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    }

    const innerStyle = {
      backgroundColor: this.props.color,
      fontSize: `${this.props.fontSize}px`
    }

    return (
      <div className="flip-clock-small-wrapper" style={{ margin: "0px" }}>
        {this.state.content.split("").map((ch, index) => (
          <ul
            key={index}
            className={
              this.state.content[index] !== this.state.prevContent[index]
                ? "play"
                : "pause"
            }
            style={flipContainerStyle}
          >
            <li className="flip-clock-before">
              <a href="javascript;;">
                <div className="up">
                  <div className="shadow" />
                  <div className="inn" style={innerStyle}>
                    {ch}
                  </div>
                </div>
                <div className="down">
                  <div className="shadow" />
                  <div className="inn" style={innerStyle}>
                    {ch}
                  </div>
                </div>
              </a>
            </li>
            <li className="flip-clock-active">
              <a href="javascript;;">
                <div className="up">
                  <div className="shadow" />
                  <div className="inn" style={innerStyle}>
                    {ch}
                  </div>
                </div>
                <div className="down">
                  <div className="shadow" />
                  <div className="inn" style={innerStyle}>
                    {ch}
                  </div>
                </div>
              </a>
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

export default FlipCard
