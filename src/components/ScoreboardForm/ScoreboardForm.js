import React, { Component } from "react"
import {
  Form,
  Segment,
  Container,
  Header,
  Message,
  Label
} from "semantic-ui-react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

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
  state = { input: { title: "", description: "", key: "" } }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState(prev => ({ input: { ...prev.input, [name]: value } }))
  }

  handleCreateClick = (createDomain, event) => {
    const domain = { ...this.state.input, url: "/" + this.state.input.key }
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
                    name="key"
                    label="Url"
                    width={4}
                    value={this.state.input.key}
                    onChange={this.handleInputChange}
                  >
                    <Label basic>
                      <span style={{ fontSize: 18 }}>/</span>
                    </Label>
                    <input />
                  </Form.Input>
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
