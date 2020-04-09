import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BuddyList from './BuddyList.js'
import MessageContainer from './MessageContainer.js'
export default function ChatComponent(props){
    const [Chat, setChat] = React.useState(true);
    const useStyles = makeStyles({
      chatContainer: {
        width: '100%%',
        maxWidth:"300px",
        
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        height:"800px",
        wrap:"wrapContent",
        paddingBottom:"5px",
        zIndex:2000,
        display:props.Display
      }
     
      
    });
    const classes = useStyles(props);
      const toggleDisplay=()=>{
          console.log('setting chat')
        setChat(!Chat)
      }

      const getDisplay = ()=>{
          console.log(Chat)
        if(Chat===true){
            return <MessageContainer toggle={toggleDisplay}/>
            console.log('chat is true')
        }else{
             return <BuddyList toggle={toggleDisplay}/>
             console.log('chat is false')
        }
      }
      
    return(
        <div className={classes.chatContainer}>
            
          {getDisplay() }
           
         </div>   
             
    )




}