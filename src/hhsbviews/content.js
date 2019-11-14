import React from 'react'

import GridContainer from "components/Grid/GridContainer.js";
import Content from "../hhsbComponents/ContentList.js"
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Accordion from "components/Accordion/Accordion.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js"
import { getThemeProps } from '@material-ui/styles';
import Badge from "components/Badge/Badge.js";
import CustomizedInputBase from 'hhsbComponents/searchBar.js'
import Pagination from "material-ui-flat-pagination";
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import Calendar from 'hhsbAssets/Calendar.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import AlertList from  'hhsbComponents/AlertList.js'
import Box from '@material-ui/core/Box';

export default function Content() {
   let NotificationData=
   [{AlertTitle:'Quoted',color:'#00CAE3', AlertBody:'There’s no time like the present, so present your time as if it only one in the world”',time:'Today @ 10pm',points:'+100W'},{AlertTitle:'Upvoted',color:'#55B559', AlertBody:'',time:'',points:''},
   {AlertTitle:'Commented',color:'#FF9E0F', AlertBody:'',time:'',points:''},{AlertTitle:'Downvoted',color:'#FF1100', AlertBody:'',time:'',points:''},
   {AlertTitle:'Submitted',color:'#000000', AlertBody:'',time:'',points:''},{AlertTitle:'Heared',color:'#E91E63', AlertBody:'',time:'',points:''}]
   const handleClick=(x)=>{
      console.log(x)
    }

    return(
        <Card style={{display:"flex",flexBasis:"800px"}} >
          <CardBody >
           <GridContainer  
               direction="row"
               justify="center"
               alignItems="center"
               
              >
                <GridContainer alignItems="center"  direction="row"  style={{"width":"50%"}}>
                  <Slider
                    value={30}                  
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"                  
                  /> 
                
                </GridContainer>
                <br></br>
                <br></br> 
              
              <GridContainer alignItems="center"  direction="row"
               justify="space-between" >  
              
                <h3 style={{color:"white",font:"League Spartan",fontWeight: "bold",paddingLeft:"20px",paddingBottom:"5px"}}>Jane Doe</h3> 
                  
                <CustomizedInputBase></CustomizedInputBase>
              <div style={{display:'flex',justifyContent:'flex-end',flexDirection:"row"}}>
            
                <img src={Calendar} style={{display:"flex",maxHeight:"40px",paddingLeft:"15px"}}/>
                <img src={Filter} style={{display:"flex",maxHeight:"40px",paddingLeft:"15px"}}/>
                <img src={Emoji} style={{display:"flex",maxHeight:"40px",paddingLeft:"15px",paddingRight:"15px"}}/> 
              </div>
             
                
             
            
                </GridContainer> 
               
              </GridContainer>
           <br></br>
           <br></br>
        <AlertList Data={NotificationData}/>
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