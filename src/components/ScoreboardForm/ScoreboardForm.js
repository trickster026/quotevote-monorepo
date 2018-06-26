import React, { Component } from "react"
import { Form, Segment, Container, Header } from "semantic-ui-react"

const generateKey = title => {
  return title.replace(/\s+/, "").toLowerCase()
}

class ScoreboardForm extends Component {
  state = { input: { title: "", description: "" } }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState(prev => ({ input: { ...prev.input, [name]: value } }))
  }

  render = () => {
    return (
      <Segment as={Container} basic>
        <Header size="huge">Create a new scoreboard!</Header>
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
              value={"/" + generateKey(this.state.input.title)}
            />
          </Form.Group>
          <Form.Input
            label="Description"
            value={this.state.input.description}
            onChange={this.handleInputChange}
          />
          <Form.Button primary>Create</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default ScoreboardForm
