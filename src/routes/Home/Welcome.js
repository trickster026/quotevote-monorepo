import React from 'react'
import {Header, Segment} from 'semantic-ui-react'

const Welcome = () => (
    <div>
        <Header as='h2' attached='top'>
            Welcome to HHSB!
        </Header>
        <Segment attached>
            <p> Here you can vote on hip hop lyrics, see which rappers are scoring the best, and share your favorite
                lines.
            </p>
            <p>This site is best used with Spotify, without Spotify you will not be able to stream music from within the
                site.
            </p>
            <p>
                You will have to use an external music app.
            </p>

        </Segment>
    </div>
)

export default Welcome
