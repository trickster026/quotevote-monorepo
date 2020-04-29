import React from 'react'

import {useQuery} from '@apollo/react-hooks';
import Card from "mui-pro/Card/Card.js"
import CardBody from "mui-pro/Card/CardBody.js"
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomizedInputBase from 'hhsbComponents/searchBar'
import GridContainer from "mui-pro/Grid/GridContainer.js"
import Pagination from "material-ui-flat-pagination";
import Slider from '@material-ui/core/Slider';

import Calendar from 'hhsbAssets/Calendar.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Box from '@material-ui/core/Box'

import Content from "../hhsbComponents/ContentList"
import { GET_TOP_POSTS } from 'graphql/query'

export default function TrendingPosts() {
  const { loading, error, data } = useQuery(GET_TOP_POSTS, {
    variables: { limit: 5, offset: 0, searchKey: '' },
  })
  if (loading) {
    return (<CircularProgress color="secondary"/>)
  }

  if (error) return `Something went wrong: ${error}`
  const posts = (data && data.posts) || []
  // const handleClick = (x) => {
  //     console.log(x)
  // }

  return (
    <Card style={{"height": "800px"}}>
      <CardBody>
        <GridContainer
          direction="row"
          justify="center"
          alignItems="center"
        >
          <GridContainer alignItems="center" direction="row" style={{"width": "50%"}}>
            <Slider
              value={30}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
          </GridContainer>
          <br></br>
          <br></br>
          <GridContainer
            alignItems="center"
            justify="space-between"
            direction="row"
            style={{
              backgroundColor: "#2A6797",
              boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              width: "75%",
              wrap: "nowrap"
            }}
          >
            <h3
              style={{
                color: "white",
                font: "League Spartan",
                fontWeight: "bold",
                paddingLeft: "20px",
                paddingBottom: "5px"
              }}
            >Trending</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: "row" }}>
              <CustomizedInputBase></CustomizedInputBase>
              <img alt="" src={Calendar} style={{ display: "flex", maxHeight: "40px", paddingLeft: "15px" }}/>
              <img alt="" src={Filter} style={{ display: "flex", maxHeight: "40px", paddingLeft: "15px" }}/>
              <img
                alt=""
                src={Emoji}
                style={{
                  display: "flex",
                  maxHeight: "40px",
                  paddingLeft: "15px",
                  paddingRight: "15px"
                }}
              />
            </div>
          </GridContainer>
        </GridContainer>
        <br></br>
        <br></br>
        <GridContainer>
          <Content MessageData={posts}/>
        </GridContainer>
      </CardBody>
      <Pagination
        limit={10}
        offset={0}
        total={100}
        onClick={(e, offset) => this.handleClick(offset)}
      />
    </Card>
  )
}    