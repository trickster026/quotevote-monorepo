import React from "react"

// core material-ui/components
import GridContainer from "material-ui/components/Grid/GridContainer.js"
import GridItem from "material-ui/components/Grid/GridItem.js"
import Heading from "material-ui/components/Heading/Heading.js"
import Timeline from "material-ui/components/Timeline/Timeline.js"
import Card from "material-ui/components/Card/Card.js"
import CardBody from "material-ui/components/Card/CardBody.js"

import { stories } from "material-ui/variables/general.js"

export default function TimelinePage() {
  return (
    <div>
      <Heading title="Timeline" textAlign="center" />
      <GridContainer>
        <GridItem xs={12}>
          <Card plain>
            <CardBody plain>
              <Timeline stories={stories} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
