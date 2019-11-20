import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import Button from "@material-ui/core/Button";

import Message from "hhsbComponents/ChatComponents/chatMessage.js"
import InputWithIcon from "hhsbComponents/ChatComponents/chatSearch.js"
import ListDividers from 'hhsbComponents/ChatComponents/List.js'

export default function MessageContainer(){
    const useStyles = makeStyles({
        chatContainer: {
          width: '33%',
          maxWidth:"300px",
          backgroundColor:'#191919',
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"center",
          height:"800px",
          wrap:"wrapContent"
        },
        bullet: {
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)"
        },
        margin:{
          width:"95%"
        },
        header:{
          width:"100%",
          backgroundColor:"#615B5B",
          color:"white",
          alignItems:"center",
          justifyContent:"center",
          height:"8%"
        },
        headerText:{
          fontSize:"x-large",
          fontWeight:900
        }
        
      });
      const classes = useStyles();
      let messageData=[{Content:"I said this thing",Color:"green",Username:"steve"},{Content:"well I say this other thing",Color:"red",Username:"alice"},{Content:"I sadi it much louder",Color:"red",Username:"bolb"}]
    return(
        <GridContainer className={classes.chatContainer}>
            <GridContainer className={classes.header}>
            <p className={classes.headerText}> Buddy List</p>
            </GridContainer>
            <GridContainer className={classes.header}>
            <p className={classes.headerText}> Buddy List</p>
            </GridContainer>
         </GridContainer>   
             
    )




}