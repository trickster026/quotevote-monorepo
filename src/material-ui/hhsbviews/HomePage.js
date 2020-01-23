import React, { Component } from "react"
import gql from "graphql-tag"
import { Mutation, Query, withApollo } from "react-apollo"
import { connect } from "react-redux"
import GridContainer from "material-ui/components/Grid/GridContainer.js"
import Content from "../hhsbComponents/ContentList.js"
import GridItem from "material-ui/components/Grid/GridItem.js"
import NavPills from "material-ui/components/NavPills/NavPills.js"
import Accordion from "material-ui/components/Accordion/Accordion.js"
import Card from "material-ui/components/Card/Card.js"
import CardBody from "material-ui/components/Card/CardBody.js"
import CardHeader from "material-ui/components/Card/CardHeader.js"
import CustomInput from "material-ui/components/CustomInput/CustomInput.js"
import Button from "material-ui/components/CustomButtons/Button.js"
import { getThemeProps } from "@material-ui/styles"
import Badge from "material-ui/components/Badge/Badge.js"
import CustomizedInputBase from "../hhsbComponents/searchBar.js"
import { APP_TOKEN } from "../../utils/constants"

import Pagination from "material-ui-flat-pagination"
import SearchIcon from "@material-ui/icons/Search"
import Slider from "@material-ui/core/Slider"
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone"
import Calendar from "../hhsbAssets/Calendar.svg"
import Filter from "../hhsbAssets/Filter.svg"
import Emoji from "../hhsbAssets/FollowingEmoji.svg"
import SnackbarContent from "material-ui/components/Snackbar/SnackbarContent.js"
import AlertList from "../hhsbComponents/AlertList.js"
import Box from "@material-ui/core/Box"

const search = gql`
  query search($text: String!) {
    searchContent(text: $text) {
      _id
      title
      creatorId
      domain {
        key
      }
    }
    searchCreator(text: $text) {
      _id
      name
      avatar
      creator {
        _id
      }
    }
  }
`
class HomePage extends Component {
  state = { searchText: "" }

  NotificationData = [
    {
      AlertTitle: "Quoted",
      color: "#00CAE3",
      AlertBody:
        "There’s no time like the present, so present your time as if it only one in the world”",
      time: "Today @ 10pm",
      points: "+100W"
    },
    {
      AlertTitle: "Upvoted",
      color: "#55B559",
      AlertBody: "",
      time: "",
      points: ""
    },
    {
      AlertTitle: "Commented",
      color: "#FF9E0F",
      AlertBody: "",
      time: "",
      points: ""
    },
    {
      AlertTitle: "Downvoted",
      color: "#FF1100",
      AlertBody: "",
      time: "",
      points: ""
    },
    {
      AlertTitle: "Submitted",
      color: "#000000",
      AlertBody: "",
      time: "",
      points: ""
    },
    {
      AlertTitle: "Heared",
      color: "#E91E63",
      AlertBody: "",
      time: "",
      points: ""
    }
  ]

  handleClick = x => {
    console.log(x)
  }
  search = () => {
    if (this.props.client) {
      return async payload => {
        return await this.props.client.query({
          query: search,
          context: { token: APP_TOKEN },
          variables: { text: payload }
        })
      }
    }
  }

  handleTextChange = async ({ target: { value } }) => {
    this.setState({ searchText: value })
    console.log("changed to====>>", value)
    const list = (await this.search()(value)).data
    console.log("list======>.>>.>", list)
  }

  render() {
    const { searchText } = this.state
    return (
      <Card style={{ display: "flex", flexBasis: "800px" }}>
        <CardBody>
          <GridContainer direction="row" justify="center" alignItems="center">
            <GridContainer
              alignItems="center"
              direction="row"
              style={{ width: "50%" }}
            >
              <GridContainer justify="center" wrap="nowrap" direction="row">
                <p
                  style={{
                    fontSize: "20px",
                    color: "gray",
                    font: "League Spartan",
                    fontWeight: "900",
                    textDecoration: "underline",
                    textShadow: "1px 1px gray"
                  }}
                >
                  All | Content | Votes | Comments | Quotes
                </p>
              </GridContainer>
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
              direction="row"
              justify="space-between"
              style={{
                backgroundColor: "#FF7A00",
                boxShadow:
                  "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
              >
                Activity Feed
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "row"
                }}
              >
                <CustomizedInputBase
                  searchText={searchText}
                  onTextChange={this.handleTextChange}
                  searchText="hello from the other side"
                />{" "}
                <img
                  src={Calendar}
                  style={{
                    display: "flex",
                    maxHeight: "40px",
                    paddingLeft: "15px"
                  }}
                />
                <img
                  src={Filter}
                  style={{
                    display: "flex",
                    maxHeight: "40px",
                    paddingLeft: "15px"
                  }}
                />
                <img
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
          <AlertList Data={this.NotificationData} />
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
}

const mapStateToProps = state => {
  console.log("state====", state)
  return {
    login: state.login
  }
}
export default withApollo(connect(mapStateToProps)(HomePage))
