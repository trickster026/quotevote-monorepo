import React from "react"

// @material-ui/core material-ui/components
import { makeStyles } from "@material-ui/core/styles"

// core material-ui/components
import GridContainer from "material-ui/components/Grid/GridContainer.js"
import GridItem from "material-ui/components/Grid/GridItem.js"

import styles from "material-ui/assets/jss/material-dashboard-pro-react/views/errorPageStyles.js"

const useStyles = makeStyles(styles)

export default function ErrorPage() {
  const classes = useStyles()
  return (
    <div className={classes.contentCenter}>
      <GridContainer>
        <GridItem md={12}>
          <h1 className={classes.title}>404</h1>
          <h2 className={classes.subTitle}>Page not found :(</h2>
          <h4 className={classes.description}>
            Ooooups! Looks like you got lost.
          </h4>
        </GridItem>
      </GridContainer>
    </div>
  )
}
