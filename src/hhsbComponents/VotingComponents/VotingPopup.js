import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, Fragment } from "react";

import {
  Paper,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Zoom
} from "@material-ui/core";
import {
  CheckBoxOutlined,
  ClearOutlined,
  ChatOutlined,
  FormatQuote
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  paperCollapsed: {
    margin: theme.spacing(1),
    backgroundColor: "black",
    padding: 10,
    paddingTop: 33,
    height: 90,
    width: 290,
    zIndex: 1
  },
  paperExpaned: {
    margin: theme.spacing(1),
    backgroundColor: "black",
    padding: 10,
    paddingTop: 33,
    height: 90,
    position: "absolute",
    top: 55
  },
  icon: { fontSize: 40 },
  input: { color: "white", padding: 10 },
  button: {
    backgroundColor: "#df2769",
    color: "white"
  }
}));

const VotingPopup = () => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const selectionPopover = document.querySelector("#popButtons");
    selectionPopover.addEventListener("mousedown", e => {
      e.preventDefault();
    });
  });

  return (
    <Fragment>
      <Zoom in={!expand}>
        <Paper
          id="popButtons"
          elevation={4}
          className={classes.paperCollapsed}
        />
      </Zoom>
      <Paper
        style={{
          backgroundColor: "#df2769",
          width: 266,
          zIndex: 1,
          top: expand ? 31 : 20,
          left: 20,
          position: "absolute"
        }}
      >
        <IconButton>
          <CheckBoxOutlined className={classes.icon} />
        </IconButton>
        <IconButton>
          <ClearOutlined className={classes.icon} />
        </IconButton>
        <IconButton onClick={() => setExpand(!expand)}>
          <ChatOutlined className={classes.icon} />
        </IconButton>
        <IconButton>
          <FormatQuote className={classes.icon} />
        </IconButton>
      </Paper>
      <Zoom in={expand}>
        <Paper id="popButtons" elevation={4} className={classes.paperExpaned}>
          <Input
            placeholder="TYPE COMMENT HERE"
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  className={classes.button}
                  size="small"
                >
                  SEND
                </Button>
              </InputAdornment>
            }
          />
        </Paper>
      </Zoom>
    </Fragment>
  );
};

export default VotingPopup;
