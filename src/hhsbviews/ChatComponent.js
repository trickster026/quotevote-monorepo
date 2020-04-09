import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import BuddyList from './BuddyList.js'
import MessageContainer from './MessageContainer.js'

export default function ChatComponent(){
    const [Chat, setChat] = React.useState(true);
    
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
        <GridContainer >
            
          {getDisplay() }
           
         </GridContainer>   
             
    )




}