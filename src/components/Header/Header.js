import React, { PureComponent } from "react"
import { Menu, Input, Icon } from "semantic-ui-react"

class HeaderComponent extends PureComponent {
  state = { search: "" }

  render = () => {
    return (
      <Menu attached="top" color="blue" size="huge" inverted borderless>
        <Menu.Menu position="left">
          <Menu.Item>
            <Icon name="music" />
            HIPHOP SCOREBOARD (Temp)
          </Menu.Item>
          <Menu.Item>ACCOUNT</Menu.Item>
          <Menu.Item>SIGN OUT</Menu.Item>
        </Menu.Menu>

        <Menu.Menu position="right" borderless>
          <Menu.Item>
            <Input
              placeholder="Song name..."
              label="Search"
              labelPosition="right"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default HeaderComponent
