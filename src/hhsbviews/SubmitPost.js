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
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove';

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
  const [subScoreboardIsOpen, setCreateSubScoreboard] = useState(false)
  const [privacy, setPrivacy] = useState('private')
  // const [showShareableLink, setShowShareableLink] = useState(false) 

  const { user } = useSelector(state => state.loginReducer);
  const { loading, error, data } = useQuery(DOMAIN_QUERY, {
    variables: { limit: 0 }
   })

  const [submitText, { data: submitData }] = useMutation(SUBMIT_TEXT);
  const [createDomain, { data: domainData}] = useMutation(CREATE_DOMAIN)


  const handleSubmit =  async (event) => {
    event.preventDefault()
    let domainResult;
    try {
    if (subScoreboardIsOpen) {
         domainResult= await createDomain({
          variables: {
            domain: {
              userId: user.creatorId,
              title: domain,
              url: '/' + domain.toLowerCase(),
              key: domain.toLowerCase(),
              privacy,
              description: "Description for: " + domain + " group"
            }
          }
        })
      }
        const domainId = domain._id ? domain._id : domainResult.data.createDomain._id
        const submitResult = await submitText({
          variables: {
            content: {
              title: title,
              text: text,
              creatorId: user.creatorId,
              domainId
            }
          }
        })
        const { _id } = submitResult.data.addContent
        const domainKey = domain.key ? domain.key : domain.toLowerCase()
        window.alert(`Sucessfully made post. Go to https://alpha.scoreboard.vote/boards/${domainKey}/content/${_id}`)
      } catch (err) {
        console.log('Something went wrong', { err })
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

  const handleCreateSubScoreboard = event => {
    setCreateSubScoreboard(!subScoreboardIsOpen)
  }

  const handlePrivacy = event => {
    setPrivacy(event.target.value)
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
              required
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
                {
                  subScoreboardIsOpen && subScoreboardIsOpen 
                  ? 
                  <TextField
                    id="group"
                    label="Group"
                    placeholder="Create a new group"
                    name="group"
                    required
                    onChange={handleDomain}
                    value={domain.title}  
                    style={{ width: 280 }}
                  />
                : 
                <>
                <InputLabel id="group-label" htmlFor="group">Group</InputLabel>

                  <Select
                  id="group"
                  value={domain.title}
                  placeholder={domain.title}
                  required
                  onChange={handleDomain}
                  style={{ width: 280 }}
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
                </>
                }
                
              </FormControl>
                 <IconButton 
                  style={{ marginTop: 8, marginLeft: 4}}
                  onClick={handleCreateSubScoreboard}
                >
                  { subScoreboardIsOpen && subScoreboardIsOpen 
                   ? <Tooltip title="Choose an existing group" style={{ fontSize: 18 }}><RemoveIcon/></Tooltip>
                   : <Tooltip title="Add a new group"><AddIcon/></Tooltip>
                  }
                </IconButton>
              </div>
              <Button 
                type="submit"
                variant="contained"
                size="large"
                style={{
                  backgroundColor: 'rgb(233, 30, 99)'
                }}
               >
                Submit
              </Button>
            </div>
              {
                subScoreboardIsOpen &&
                <div style={{ paddingTop  : 16}}>
                  <FormControl component="fieldset" >
                    <FormLabel component="legend">Choose Visibility</FormLabel>
                    <RadioGroup aria-label="privacy" name="privacy" value={privacy} onChange={handlePrivacy}>
                      <FormControlLabel value="private" control={<Radio />} label="Private" />
                      <FormControlLabel value="public" control={<Radio />} label="Pulbic" />
                    </RadioGroup>
                  </FormControl>
                </div>
              }
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