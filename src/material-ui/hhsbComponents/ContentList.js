import React from "react"

import GridContainer from "../components/Grid/GridContainer.js"
import GridItem from "../components/Grid/GridItem.js"
import NavPills from "../components/NavPills/NavPills.js"
import Accordion from "material-ui/components/Accordion/Accordion.js"
import Card from "../components/Card/Card.js"
import CardHeader from "../components/Card/CardHeader.js"
import CardBody from "../components/Card/CardBody.js"
import Button from "../components/CustomButtons/Button.js"
import { getThemeProps } from "@material-ui/styles"
import Badge from "../components/Badge/Badge.js"
import CustomAccordion from "./customExpansionPanel.js"
const Content = props => {
  return (
    <GridContainer>
      <GridItem direction="row" justify="center" alignItems="center">
        <CustomAccordion active={0} collapses={props.MessageData} />
      </GridItem>
    </GridContainer>
  )
}
export default Content
