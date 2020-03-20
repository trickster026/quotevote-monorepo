import React, { useState } from "react"
import { 
  TextField, 
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputBase
} from "@material-ui/core"

import GridItem from "material-ui/components/Grid/GridItem"
import Card from "material-ui/components/Card/Card"
import CardHeader from "material-ui/components/Card/CardHeader"
import CardBody from "material-ui/components/Card/CardBody"
import Button from "material-ui/components/CustomButtons/Button"
import GridContainer from "material-ui/components/Grid/GridContainer"

import { useMutation } from '@apollo/react-hooks'
import { CREATE_DOMAIN } from '../graphql/mutations'

const inputStyles = {
  color: "#E91E63",
  fontSize: "25px",
  font: "League Spartan",
  fontWeight: "bold"
}

export default function SubmitPost() {
  // const [createDomain, { data, loading, error }] = useMutation(CREATE_DOMAIN);

  // const handleCreateDomain = async (values, actions) => {
  //   const {
      
  //   } = values
  // }
  
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
                    defaultValue="[Enter Title Here]"
                    style={inputStyles}
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
            <TextField
                id="post"
                label="Post"
                placeholder="Input text to submit post"
                multiline
                fullWidth
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
                <Button variant="contained" color="primary" style={{ marginTop: 8, marginLeft: 4}}>
                  +
                </Button>
              </div>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </div>
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