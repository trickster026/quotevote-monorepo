import React, { Component } from "react"
import {
  Container,
  Segment,
  Form,
  Header,
  Divider,
  Modal,
  Button,
  Input
} from "semantic-ui-react"
import { Link } from "react-router-dom"
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
      url
    }
  }
`

class SubmissionForm extends Component {
  state = {
    title: "",
    text: "",
    showShareableLink: false
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
    this.setState({ title: "", text: "", showShareableLink: true })
  }

  handleError = event => {
    toast.error("Your submission failed!")
  }

  handleClose = () => {
    this.setState({ showShareableLink: false })
  }

  handleCopy = shareableLink => {
    const textArea = document.createElement("textarea")
    textArea.value = shareableLink
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    toast.info("Copied to clipboard!")
  }

  renderModal = url => {
    const domain =
      process.env.NODE_ENV === "production"
        ? "hiphopscoreboard.com"
        : "localhost:3000"
    const shareableLink = `http://${domain}/shareables/${url}`
    return (
      <Modal
        size="tiny"
        open={this.state.showShareableLink}
        onClose={this.handleClose}
      >
        <Modal.Header>Your shareable link is ready</Modal.Header>
        <Modal.Content>
          <Segment basic padded>
            Share your text to your friends and family.
            <Input
              fluid
              action={{
                color: "teal",
                icon: "copy",
                content: "Copy",
                labelPosition: "left",
                onClick: e => this.handleCopy(shareableLink)
              }}
              value={shareableLink}
            />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            as={Link}
            positive
            content="Go to text"
            to={`/shareables/${url}`}
          />
          <Button negative onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  render = () => {
    return (
      <Mutation
        mutation={SUBMIT_TEXT}
        onCompleted={this.handleSuccess}
        onError={this.handleError}
      >
        {(submitText, { data }) => {
          let url = ""
          if (data) url = data.createText.url

          return (
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
                  <Form.Button color="teal">Submit</Form.Button>
                </Form>
                <ToastContainer
                  position="bottom-left"
                  autoClose={2000}
                  closeOnClick
                />
                {this.renderModal(url)}
              </Segment>
            </Container>
          )
        }}
      </Mutation>
    )
  }
}

const mapStateToProps = ({ login: { user } }) => ({
  authorId: user._id
})

export default connect(mapStateToProps)(SubmissionForm)
