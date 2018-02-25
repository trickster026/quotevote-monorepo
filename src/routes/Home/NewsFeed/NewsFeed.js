import React, { PureComponent } from "react"
import { Header, Segment, List, Image } from "semantic-ui-react"
import PropTypes from "prop-types"

class NewsFeed extends PureComponent {
  static propTypes = {
    activities: PropTypes.array
  }

  static defaultProps = {
    activities: [
      {
        thumbnail: "https://dummyimage.com/100x100/000/fff",
        subject: "Unknown Song",
        author: "Unknown Artist",
        message: "Not Available"
      }
    ]
  }

  render = () => {
    return (
      <div>
        <Header className="header-module" inverted attached="top" as="h4">
          Public News Feed
        </Header>
        <Segment attached>
          <List animated verticalAlign="middle">
            {this.props.activities.map((activity, index) => {
              const { author, message, subject, thumbnail } = activity
              return (
                <List.Item key={index}>
                  <Image src={thumbnail} size="mini" />
                  <List.Content>
                    <List.Header as="a">
                      <span style={{ color: "#595959" }}>{message}</span>:{" "}
                      {subject}
                    </List.Header>
                    <List.Description>{author}</List.Description>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </Segment>
      </div>
    )
  }
}

export default NewsFeed
