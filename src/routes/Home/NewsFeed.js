import React, {PureComponent} from "react"
import {Card, Feed} from "semantic-ui-react"

class NewsFeed extends PureComponent {
    render = () => {
        return (
            <Card fluid style={{minHeight: "100%"}}>
                <Card.Content>
                    <Card.Header>Public News Feed</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>News Feed 1</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>News Feed 2</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>News Feed 3</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>News Feed 4</Feed.Content>
                        </Feed.Event>
                        <Feed.Event>
                            <Feed.Content>News Feed 5</Feed.Content>
                        </Feed.Event>

                    </Feed>
                </Card.Content>
            </Card>
        )
    }
}

export default NewsFeed
