import React, { Component } from "react"
import { Form, Segment, Container, Header, Message } from "semantic-ui-react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const getUrl = title => {
  return title.replace(/\W/g, "").toLowerCase()
}

const mutation = gql`
  mutation createDomain($domain: DomainInput!) {
    createDomain(domain: $domain) {
      _id
      title
      description
      url
      key
      created
    }
  }
`

class ScoreboardForm extends Component {
  state = { input: { title: "", description: "" } }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState(prev => ({ input: { ...prev.input, [name]: value } }))
  }

  handleCreateClick = (createDomain, event) => {
    const key = getUrl(this.state.input.title)
    const domain = { ...this.state.input, key, url: "/" + key }
    createDomain({ variables: { domain } })
  }

  handleError = message => {
    this.setState({ error: message })
  }

  render = () => {
    return (
      <Mutation mutation={mutation}>
        {(createDomain, { data, error }) => {
          return (
            <Segment as={Container} basic>
              <Header size="huge">Create a new scoreboard!</Header>
              <Message negative hidden={!error}>
                {error && error.message}
              </Message>
              <Message positive hidden={!data}>
                Successfully created your scoreboard
              </Message>
              <Form>
                <Form.Group>
                  <Form.Input
                    name="title"
                    label="Title"
                    width={12}
                    value={this.state.input.title}
                    onChange={this.handleInputChange}
                  />
                  <Form.Input
                    name="description"
                    label="Url"
                    width={4}
                    disabled
                    value={"/" + getUrl(this.state.input.title)}
                  />
                </Form.Group>
                <Form.TextArea
                  label="Description"
                  name="description"
                  rows={10}
                  value={this.state.input.description}
                  onChange={this.handleInputChange}
                />
                <Form.Button
                  primary
                  onClick={e => this.handleCreateClick(createDomain, e)}
                >
                  Create
                </Form.Button>
              </Form>
            </Segment>
          )
        }}
      </Mutation>
    )
  }
}

export default ScoreboardForm
