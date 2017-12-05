import React, { PureComponent } from "react"
import { Accordion, Icon } from "semantic-ui-react"

class Albums extends PureComponent {
  render = () => {
    return (
      <Accordion styled>
        <Accordion.Title active>
          <Icon name="dropdown" />
          Album 1
        </Accordion.Title>
        <Accordion.Content active>Song 1</Accordion.Content>

        <Accordion.Title>
          <Icon name="dropdown" />
          Album 1
        </Accordion.Title>
        <Accordion.Content>Song 1</Accordion.Content>
      </Accordion>
    )
  }
}

export default Albums
