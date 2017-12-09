import React, {PureComponent} from "react"
import {Card, Feed} from "semantic-ui-react"

class TrendingSongs extends PureComponent {
    render = () => {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>Trending Songs</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>Song 1</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>Song 2</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>Song 3</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>Song 4</Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Content>Song 5</Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        )
    }
}

export default TrendingSongs
