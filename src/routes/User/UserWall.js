import React, {PureComponent} from "react"
import {Card, Feed} from "semantic-ui-react"

class UserWall extends PureComponent {

    render = () => {
        return (
            <Card fluid style={{minHeight: "100%"}}>
                <Card.Content>
                    <Card.Header>User Wall</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>"I'm a self made millionaire...."</Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>"I'm a self made millionaire...."</Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>"I'm a self made millionaire...."</Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>"I'm a self made millionaire...."</Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>"I'm a self made millionaire...."</Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        )

    }
}

export default UserWall
