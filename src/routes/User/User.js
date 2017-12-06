import React, {PureComponent} from "react"
import {Grid, Container, Segment} from "semantic-ui-react"
import UserProfile from "../../components/Profile/UserProfile"
import TopArtists from "../../components/TopArtists/TopArtists"
import FantasyLabel from "./FantasyLabel"
import UserWall from "./UserWall"

class User extends PureComponent {
    render = () => {
        return (
            <Segment as={Container} basic>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <UserProfile/>
                        </Grid.Column>
                        <Grid.Column>
                            <TopArtists/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={6}>
                            <FantasyLabel/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <UserWall/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}

export default User
