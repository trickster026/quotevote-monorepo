import React, { Component } from "react"
import { Header, List } from "semantic-ui-react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import "./UserText.css"

class UserText extends Component {
  static propTypes = {
    texts: PropTypes.array.isRequired
  }

  static defaultProps = {
    texts: []
  }

  render = () => {
    return (
      <div className="root">
        <Header
          as="h1"
          style={{ fontSize: 14, paddingTop: 20, paddingLeft: 10 }}
        >
          Posted Contents
        </Header>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
          <List divided relaxed>
            {this.props.texts.map(text => (
              <List.Item key={text.value}>
                <List.Icon name="content" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header
                    as={Link}
                    to={`/boards/${text.domain}/content/${text.value}`}
                  >
                    {text.text}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

export default withRouter(UserText)
