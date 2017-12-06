import React, {PureComponent} from "react"
import {Menu, Input, Image} from "semantic-ui-react"
import hihopImage from "../../assets/hiphop.png"

class HeaderComponent extends PureComponent {
    state = {search: ""}

    render = () => {
        return (
            <Menu attached="top" color="grey" size="huge" inverted borderless>
                <Menu.Menu position="left">
                    <Menu.Item>
                        <Image src={hihopImage}/>
                    </Menu.Item>
                    <Menu.Item>SCOREBOARD</Menu.Item>
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
