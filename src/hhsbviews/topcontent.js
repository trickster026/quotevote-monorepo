import React from 'react'

import GridContainer from "components/Grid/GridContainer";
import Content from "../hhsbComponents/ContentList"
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CustomizedInputBase from 'hhsbComponents/searchBar'
import Pagination from "material-ui-flat-pagination";
import Slider from '@material-ui/core/Slider';
import Calendar from 'hhsbAssets/Calendar.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import CircularProgress from "@material-ui/core/CircularProgress";

const TOP_CONTENTS = gql`
    query topContents {
      contents {
        _id
        title
        content: text
      }
    }
`;


export default function ContentFeed() {
    const {loading, error, data} = useQuery(TOP_CONTENTS);
    if (loading) {
        return (<CircularProgress color="secondary"/>)
    }
    console.log("DATAAAA", {data})
    const {contents} = data
    const handleClick = (x) => {
        console.log(x)
    }

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

                    <GridContainer alignItems="center" justify="space-between" direction="row"
                                   style={{
                                       backgroundColor: "#2A6797",
                                       boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                       width: "75%",
                                       wrap: "nowrap"
                                   }}>

                        <h3 style={{
                            color: "white",
                            font: "League Spartan",
                            fontWeight: "bold",
                            paddingLeft: "20px",
                            paddingBottom: "5px"
                        }}>Trending</h3>


                        <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: "row"}}>
                            <CustomizedInputBase></CustomizedInputBase>
                            <img src={Calendar} style={{display: "flex", maxHeight: "40px", paddingLeft: "15px"}}/>
                            <img src={Filter} style={{display: "flex", maxHeight: "40px", paddingLeft: "15px"}}/>
                            <img src={Emoji} style={{
                                display: "flex",
                                maxHeight: "40px",
                                paddingLeft: "15px",
                                paddingRight: "15px"
                            }}/>
                        </div>


                    </GridContainer>

                </GridContainer>
                <br></br>
                <br></br>
                <GridContainer>

                    <Content MessageData={contents}/>


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