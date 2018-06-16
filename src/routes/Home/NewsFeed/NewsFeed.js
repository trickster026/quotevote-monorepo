import React, { PureComponent } from "react"
import { List, Image } from "semantic-ui-react"
import Section from "../../../components/Layouts/Section/Section"
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
      <Section title="Public News Feed">
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
      </Section>
    )
  }
}

export default NewsFeed
