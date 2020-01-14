import React from "react"
import PropTypes from "prop-types"

// @material-ui/core material-ui/components
import { makeStyles } from "@material-ui/core/styles"

import styles from "material-ui/assets/jss/material-dashboard-pro-react/components/typographyStyle.js"

const useStyles = makeStyles(styles)

export default function Info(props) {
  const classes = useStyles()
  const { children } = props
  return (
    <div className={classes.defaultFontStyle + " " + classes.infoText}>
      {children}
    </div>
  )
}

Info.propTypes = {
  children: PropTypes.node
}
