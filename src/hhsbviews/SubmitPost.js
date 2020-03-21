import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { 
  TextField, 
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputBase,
  Modal,
  Typography
} from "@material-ui/core"

import GridItem from "material-ui/components/Grid/GridItem"
import Card from "material-ui/components/Card/Card"
import CardHeader from "material-ui/components/Card/CardHeader"
import CardBody from "material-ui/components/Card/CardBody"
import Button from "material-ui/components/CustomButtons/Button"
import GridContainer from "material-ui/components/Grid/GridContainer"

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_DOMAIN, SUBMIT_TEXT } from 'graphql/mutations'
import { DOMAIN_QUERY } from 'graphql/query'


const inputStyles = {
  color: "#E91E63",
  fontSize: "25px",
  font: "League Spartan",
  fontWeight: "bold"
}

export default function SubmitPost() {
  const [title, setTitle] = useState('[Enter Title]')
  const [text, setText] = useState('')
  const [domain, setDomain] = useState({domain: {
    title: 'Default'
  }})
  // const [createSubScoreboard, setCreateSubScoreboard] = useState(false)
  // const [showShareableLink, setShowShareableLink] = useState(false) 
  // const [privacy, setPrivacy] = useState('private')

  const { user } = useSelector(state => state.loginReducer);
  const { loading, error, data } = useQuery(DOMAIN_QUERY, {
    variables: { limit: 0 }
   })

  const [submitText, { data: submitData }] = useMutation(SUBMIT_TEXT);


  const handleSubmit =  async (event) => {
    event.preventDefault()
    try {
      const { data } = await submitText({
        variables: {
          content: {
            title: title,
            text: text,
            creatorId: user.creatorId,
            domainId: domain._id
          }
        }
      })
      const { _id } = data.addContent
      window.alert(`Sucessfully made post. Go to https://alpha.scoreboard.vote/boards/${domain.key}/content/${_id}`)
    } catch (err) {
      console.log('Something went wrong', {err})
    }
  }

  const handleText = event => {
    setText(event.target.value)
  }

  const handleTitle = event => {
    setTitle(event.target.value)
  }

  const handleDomain = event => {
    setDomain(event.target.value)
  }
   
  if (loading) {
    return 'loading'
  }
  else if(error) {
    return 'error'
  } else {  
    const publicDomains = data.domains.filter(domain => {
      return domain.privacy === 'public'
    })
    
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
                <InputLabel id="group-label" htmlFor="group">Group</InputLabel>
                <Select
                  id="group"
                  value={domain.title}
                  placeholder={domain.title}
                  onChange={handleDomain}
                  style={{ width: 240 }}
                 >
                   <MenuItem value={domain.title}>
                    {domain.title}
                   </MenuItem>
                {publicDomains.map(publicDomain => {
                  return (
                  <MenuItem
                    name={publicDomain.key}
                    value={publicDomain}
                    key={publicDomain._id}
                  >
                      {publicDomain.title}
                  </MenuItem>)
                })}
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
}