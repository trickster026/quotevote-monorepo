import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
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
            
            <ListItem button>
              <ListItemText primary={item} />
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
}
