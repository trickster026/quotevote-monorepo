import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import Alert from "./Alert.js"

export default function AlertList(props){

let Alerts=props.Data;
return(
    
    <GridContainer  direction="column"
    justify="space-between"
    alignItems="center">
        
    {Alerts.map((item,key)=>{
        console.log(item.AlertTitle)
        return(
            <div style={{width:"90%"}}>
            <Alert color={item.color} AlertTitle={item.AlertTitle}
            AlertBody={item.AlertBody}
            time={item.time}
            points={item.points}/>
            <br></br>
          
            </div>
        )
    })}
    </GridContainer>  


)




}