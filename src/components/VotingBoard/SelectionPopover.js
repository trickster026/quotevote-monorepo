import React, { Component } from "react"
import onClickOutside from "react-onclickoutside"
import PropTypes from "prop-types"

function selectionExists() {
  const selection = window.getSelection()
  return (
    selection &&
    selection.rangeCount > 0 &&
    selection.getRangeAt(0) &&
    !selection.getRangeAt(0).collapsed &&
    selection.getRangeAt(0).getBoundingClientRect().width > 0 &&
    selection.getRangeAt(0).getBoundingClientRect().height > 0
  )
}

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges()
  } else if (document.selection) {
    document.selection.empty()
  }
}

class SelectionPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popoverBox: {
        top: 0,
        left: 0
      }
    }

    this.touchIndex = 0
    this.selectionOffsets = [{}, {}]
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showPopover === true && nextProps.showPopover === false) {
      clearSelection()
    }
  }

  componentDidMount() {
    const target = document.querySelector("[data-selectable]")
    target.addEventListener("pointerup", this.handlePointerUp)
  }

  componentWillUnmount() {
    const target = document.querySelector("[data-selectable]")
    target.removeEventListener("pointerup", this.handlePointerUp)
  }

  render() {
    const { showPopover, children, style } = this.props // eslint-disable-line no-unused-vars
    const { popoverBox: { top, left } } = this.state

    const visibility = showPopover ? "visible" : "hidden"
    const display = showPopover ? "inline-block" : "none"

    return (
      <div
        ref="selectionPopover"
        style={{
          visibility,
          display,
          position: "absolute",
          top,
          left,
          ...style
        }}
      >
        {showPopover && children}
      </div>
    )
  }

  handlePointerUp = () => {
    const selection = window.getSelection()
    if (selectionExists()) {
      this.props.onSelect(selection)
      return this.computePopoverBox()
    }
    this.props.onDeselect()
  }

  // handleSelectStart = () => {
  //   const selection = window.getSelection()
  //   const { anchorOffset, extentOffset } = selection

  //   if (selectionExists()) {
  //     this.selectionOffsets[this.touchIndex] =
  //       this.touchIndex === 0 ? anchorOffset : extentOffset
  //     this.touchIndex++
  //   }

  //   if (isMobile) {
  //     if (this.touchIndex >= 2) {
  //       let baseOffset = this.selectionOffsets[0]
  //       let extentOffset = this.selectionOffsets[1]

  //       if (this.selectionOffsets[0] > this.selectionOffsets[1]) {
  //         baseOffset = this.selectionOffsets[1] - 1
  //         extentOffset = this.selectionOffsets[0] + 1
  //       }

  //       selection.setBaseAndExtent(
  //         selection.anchorNode,
  //         baseOffset,
  //         selection.anchorNode,
  //         extentOffset
  //       )
  //       this.touchIndex = 0

  //       if (selectionExists()) {
  //         this.props.onSelect(selection)
  //         return this.computePopoverBox()
  //       }
  //       this.props.onDeselect()
  //     }
  //   }
  // }

  computePopoverBox = () => {
    const selection = window.getSelection()
    if (!selectionExists()) {
      return
    }
    const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
    const popoverBox = this.refs.selectionPopover.getBoundingClientRect()
    const targetBox = document
      .querySelector("[data-selectable]")
      .getBoundingClientRect()
    this.setState({
      popoverBox: {
        top: selectionBox.top - targetBox.top - this.props.topOffset,
        left:
          selectionBox.width / 2 -
          popoverBox.width / 2 +
          (selectionBox.left - targetBox.left)
      }
    })
  }

  handleClickOutside = () => {
    this.props.onDeselect()
  }
}

SelectionPopover.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  topOffset: PropTypes.number,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  showPopover: PropTypes.bool.isRequired
}

SelectionPopover.defaultProps = {
  topOffset: 30,
  showPopover: false
}

export default onClickOutside(SelectionPopover)
