import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// nodejs library to set properties for material-ui/components
import PropTypes from "prop-types"
// @material-ui/core material-ui/components
import { makeStyles } from "@material-ui/core/styles"
// @material-ui/icons

// core material-ui/components
import styles from "material-ui/assets/jss/material-dashboard-pro-react/components/cardIconStyle.js"

const useStyles = makeStyles(styles)

export default function CardIcon(props) {
  const classes = useStyles()
  const { className, children, color, ...rest } = props
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  })
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  )
}

CardIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  children: PropTypes.node
}
