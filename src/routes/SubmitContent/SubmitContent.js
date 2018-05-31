import React, { Component } from "react"
import { Container, Segment, Form, Header, Divider } from "semantic-ui-react"
import { connect } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const SUBMIT_TEXT = gql`
  mutation submitText($text: TextInput!) {
    createText(text: $text) {
      _id
      title
      text
      authorId
      created
    }
  }
`

class SubmitContent extends Component {
  state = {
    title: "",
    text: ""
  }

  handleSubmit = (event, submitText) => {
    event.preventDefault()
    submitText({
      variables: {
        text: {
          title: this.state.title,
          text: this.state.text,
          authorId: this.props.authorId
        }
      }
    })
  }

  handleInputChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSuccess = event => {
    toast.success("Submitted successfully!")
    this.setState({ title: "", text: "" })
  }

  handleError = event => {
    toast.error("Your submission failed!")
  }

  render = () => {
    return (
      <Mutation
        mutation={SUBMIT_TEXT}
        onCompleted={this.handleSuccess}
        onError={this.handleError}
      >
        {submitText => (
          <Container>
            <Segment basic padded="very">
              <Header as="h2">User Submission Form</Header>
              <Divider />
              <Form
                onSubmit={event => {
                  this.handleSubmit(event, submitText)
                }}
              >
                <Form.Input
                  name="title"
                  fluid
                  label="Title"
                  value={this.state.title}
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <Form.TextArea
                  name="text"
                  rows={10}
                  label="Text"
                  placeholder="Write your article text here..."
                  value={this.state.text}
                  onChange={this.handleInputChange}
                />
                <Form.Button>Submit</Form.Button>
              </Form>
              <ToastContainer
                position="bottom-left"
                autoClose={2000}
                closeOnClick
              />
            </Segment>
          </Container>
        )}
      </Mutation>
    )
  }
}

const mapStateToProps = ({ login: { user } }) => ({
  authorId: user._id
})

export default connect(mapStateToProps)(SubmitContent)
