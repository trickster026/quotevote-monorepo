import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import GridContainer from "components/Grid/GridContainer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(({
  root: {
    width: "300px",
    maxWidth: 360,
    backgroundColor:props=>props.Color,
    overflow: "hidden auto",
    height: "75%"
  }
}));

export default function ListDividers(props) {
  const classes = useStyles();
  let Items = props.List;
  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {Items.map(item => {
        return (
          <div>
            <ListItem button style={{backgroundColor:item.Color,width:"300px"}}>
              <GridContainer alignItems="center">
                <ListItemText primary={item.Text} />
              </GridContainer>
              <img src={item.icon} style={{height:"30px"}}/>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}
