import React, { useState } from "react"
import { Link } from "react-router-dom"

import { 
  TextField, 
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputBase,
  SnackBar,
  Modal,
  Typography
} from "@material-ui/core"

import GridItem from "material-ui/components/Grid/GridItem"
import Card from "material-ui/components/Card/Card"
import CardHeader from "material-ui/components/Card/CardHeader"
import CardBody from "material-ui/components/Card/CardBody"
import Button from "material-ui/components/CustomButtons/Button"
import GridContainer from "material-ui/components/Grid/GridContainer"

import { CREATE_DOMAIN, SUBMIT_TEXT, DOMAIN_QUERY } from '../graphql/mutations'

const inputStyles = {
  color: "#E91E63",
  fontSize: "25px",
  font: "League Spartan",
  fontWeight: "bold"
}

export default function SubmitPost() {
  const [title, setTitle] = useState('[Enter Title]')
  const [text, setText] = useState('')
  const [domainList, setDomainList] = useState([])
  const [createSubScoreboard, setCreateSubScoreboard] = useState(false)
  const [showShareableLink, setShowShareableLink] = useState(false) 
  const [privacy, setPrivacy] = useState('private')


  const handleSubmit = (event, submitText) => {
    event.preventDefault()
    console.log('test')
  }

  const handleText = event => {
    setText(event.target.value)
  }

  const handleTitle = event => {
    setTitle(event.target.value)
  }


  const handleSuccess = event => {
    if (createSubScoreboard) {
      // toast.success("New domain created successfully!")
      setCreateSubScoreboard(false)
    } else {
      // toast.success("Submitted successfully!")
      setTitle("")
      setText("")
      setShowShareableLink(true)
    }
  }

  const handleError = event => {
    // toast.error(
      // "Content submission failed: Please provide input for required fields."
    // )
  }

  const handleCopy = shareableLink => {
    const textArea = document.createElement("textarea")
    textArea.value = shareableLink
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    // toast.info("Copied to clipboard!")
  }

  const handleDropdownChange = (e, { options, value }) => {
    this.setState({ domain: options.find(item => item.value === value) })
  }

  const handlePrivacyChange = (e, data) => {
    console.log("handlePrivacyChange", data.value)
    this.setState({ privacy: data.value })
  }

  const handleCreateSubScoreboard = () => {
    this.setState({ createSubScoreboard: true })
  }

  const handleNewSubBoardInputChange = (e, { value }) => {
    e.preventDefault()
    this.setState({ domainTitle: value })
  }
  const handleCancelNewSubScoreboard = () => {
    this.setState({ createSubScoreboard: false })
  }

  const renderCreateNewScoreboard = () => {
    return (
      <>
        <TextField
          label="New Subscoreboard"
          placeholder="Add new subscoreboard"
          onChange={this.handleNewSubBoardInputChange}
          required
        />
        <Select
          label="Privacy"

          placeholder="Choose privacy"
          onChange={this.handlePrivacyChange}
        >
          <MenuItem>Group 1</MenuItem>
          <MenuItem>Group 3</MenuItem>
          <MenuItem>Group 3</MenuItem>
        </Select>

      </>
    )
  }

  const renderModal = id => {
    const shareableLink = `/boards/${this.state.domain.key}/content/${id}`
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.showShareableLink}
        onClose={this.handleClose}  
      >
        <Typography>Your shareable link is ready</Typography>
        <Typography>
          <div>
            Share your text to your friends and family.
            <Button
              onClick={e => this.handleCopy(shareableLink)}
              value={shareableLink}
            />
          </div>
        </Typography>
          <Button
            as={Link}
            positive
            content="Go to text"
            to={`/boards/${this.state.domain.key}/content/${id}`}
          />
          <Button negative onClick={this.handleClose}>
            Close
          </Button>
      </Modal>
    )
  }
  

    return (
      <GridContainer spacing={1} direction="col">
        <GridItem xs={6}>
          <Card style={{ height: "800px" }}>
            <CardHeader style={{ zIndex: 0 }}>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between",
                  zIndex: 0
                }}
                >
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    alignContent: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <InputBase
                    style={inputStyles}
                    onChange={handleTitle}
                    value={title}
                    name="title"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-end",
                    flexBasis: "100px"
                  }}
                >     
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
            <form
            onSubmit={handleSubmit}
            >
            <TextField
              id="post"
              label="Post"
              placeholder="Input text to submit post"
              multiline
              fullWidth
              name="text"
              onChange={handleText}
              value={text}
              style={{
                maxHeight: 600,
                overflow: 'auto'
              }}
            />
            <div style={{marginTop: 24, display: 'flex', justifyContent: 'space-between', alixgnContent: 'center'}}>
              <div>
              <FormControl>
              <InputLabel id="group">Group</InputLabel>
                <Select
                  labelId="group"
                  id="group"
                 style={{ width: 200}}
                 >
                <MenuItem>Group 1</MenuItem>
                <MenuItem>Group 3</MenuItem>
                <MenuItem>Group 3</MenuItem>
                </Select>
              </FormControl>
                {
                /* Create Subscoreboard feature. 
                 * Working on main functions of the code first, to gain momentum in the redesign
                 * Planning to complete subscoreboard creation later

                 <Button 
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 8, marginLeft: 4}}
                  onClick={this.handleCreateSubScoreboard}
                >
                  +
                </Button> */
                }
              </div>
              <Button 
                type="submit"
                variant="contained"
                color="primary">
                Submit
              </Button>
            </div>
            </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} style={{ paddingBottom: 0 }}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between"
                }}
                >
                <p
                  style={{
                    color: "#E91E63",
                    fontSize: "25px",
                    font: "League Spartan",
                    fontWeight: "bold"
                  }}
                  >
                  Pop Prediction
                </p>
              </div>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
  )
}