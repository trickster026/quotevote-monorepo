import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import { Menu, Input, Image, Container } from "semantic-ui-react"
import hihopImage from "../../assets/hiphop.png"

class HeaderComponent extends PureComponent {
  state = { search: "" }

  render = () => {
    return (
      <Menu attached="top" color="grey" size="huge" inverted borderless>
        <Container>
          <Menu.Menu position="left">
            <Menu.Item as={Link} name="home" to="/">
              <Image src={hihopImage} />
            </Menu.Item>
            <Menu.Item as={Link} name="scoreboard" to="/artist/1">
              SCOREBOARD
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="account"
              to="/user/59b006a2dba5fb0027f48c76"
            >
              ACCOUNT
            </Menu.Item>
            <Menu.Item as="a" name="sign-out">
              SIGN OUT
            </Menu.Item>
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
        </Container>
      </Menu>
    )
  }
}

export default HeaderComponent
