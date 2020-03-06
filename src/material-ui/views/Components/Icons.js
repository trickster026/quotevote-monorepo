/*eslint-disable*/
import React from "react"
import PropTypes from "prop-types"

// @material-ui/core material-ui/components
import { makeStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"

// core material-ui/components
import Heading from "material-ui/components/Heading/Heading.js"
import GridContainer from "material-ui/components/Grid/GridContainer.js"
import GridItem from "material-ui/components/Grid/GridItem.js"
import Card from "material-ui/components/Card/Card.js"
import CardBody from "material-ui/components/Card/CardBody.js"

import styles from "material-ui/assets/jss/material-dashboard-pro-react/views/iconsStyle"

const useStyles = makeStyles(styles)

export default function Icons() {
  const classes = useStyles()
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Heading
          textAlign="center"
          title="Material Design Icons"
          category={
            <span>
              Handcrafted by our friends from{" "}
              <a
                target="_blank"
                href="https://design.google.com/icons/?ref=creativetim"
              >
                Google
              </a>
            </span>
          }
        />
        <Card plain>
          <CardBody plain>
            <Hidden only={["sm", "xs"]} implementation="css">
              <iframe
                className={classes.iframe}
                src="https://material.io/icons/"
                title="Icons iframe"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={["lg", "md"]} implementation="css">
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href="https://design.google.com/icons/?ref=creativetim"
                    target="_blank"
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
