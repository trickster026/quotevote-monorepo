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
export default function MessageContainer(){
    const useStyles = makeStyles({
        chatContainer: {
          width: '33%',
          maxWidth:"300px",
          backgroundColor:'#D2D2D2',
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
          width:"100%"
        }
        
      });
      const classes = useStyles();
      let messageData=[{Content:"I said this thing",Color:"green",Username:"steve"},{Content:"well I say this other thing",Color:"red",Username:"alice"},{Content:"I sadi it much louder",Color:"red",Username:"bolb"}]
    return(
        <GridContainer className={classes.chatContainer}>
            
             <br></br>
           
              {messageData.map((message)=>{
                return(<Message content={message.Content} color={message.Color} username={message.Username}/>)
            })}
            
            
            <FormControl className={classes.margin} />
            <Card>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" justifyContent="space-between">
                  <Grid style={{ paddingBottom: "20px" }}>
                    <FaceIcon style={{ backgroundColor: "#E91E63",width:"25px",paddingLeft:"5px" }} />
                  </Grid>

                  <Grid item>
                    <TextField id="input-with-icon-grid" label="type here" />
                  </Grid>
                  <Grid item>
                  <Button style={{ backgroundColor: "#E91E63",color:"white",magrin:"5px" }}>SEND</Button>
                  </Grid>
                  
                </Grid>
              </div>
            </Card>
         
        </GridContainer>
    )




}