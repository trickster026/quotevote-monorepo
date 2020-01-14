import React from "react"

import GridContainer from "material-ui/components/Grid/GridContainer.js"
import GridItem from "material-ui/components/Grid/GridItem.js"
import NavPills from "material-ui/components/NavPills/NavPills.js"
import Accordion from "material-ui/components/Accordion/Accordion.js"
import Card from "material-ui/components/Card/Card.js"
import CardHeader from "material-ui/components/Card/CardHeader.js"
import CardBody from "material-ui/components/Card/CardBody.js"
import Button from "material-ui/components/CustomButtons/Button.js"
import { getThemeProps } from "@material-ui/styles"
import Badge from "material-ui/components/Badge/Badge.js"
const ActivityBar = () => {
  return (
    <GridContainer
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "200px", backgroundColor: "FF7A00" }}
    >
      <Grid item xs={6} sm={3}></Grid>
      <Grid item xs={6}>
        <h4>Activity Feed</h4>
      </Grid>
      <Grid item xs={6} sm={3}></Grid>
    </GridContainer>
  )
}

export default Content
