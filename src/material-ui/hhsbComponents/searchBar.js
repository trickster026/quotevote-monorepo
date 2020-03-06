import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { CircularProgress } from "@material-ui/core"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import DirectionsIcon from "@material-ui/icons/Directions"
import { maxHeight } from "@material-ui/system"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    // padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    flexBasis: 300,
    minWidth: 0,
    flexWrap: "inherit",
    maxHeight: 50
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  resultContent: {
    position: "absolute",
    top: "100%",
    width: "28em",
    left: 0,
    transformOrigin: "center top",
    textAlign: "left",
    background: "#fff",
    marginTop: ".5em",
    borderRadius: ".28571429rem",
    boxShadow:
      "0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)",
    border: "1px solid #d4d4d5",
    zIndex: 998,
    overflowY: "scroll",
    maxHeight: "28em"
  },
  category: {
    display: "table-row",
    background: "#f3f4f5"
  },
  name: {
    display: "table-cell",
    textOverflow: "ellipsis",
    width: "100px",
    whiteSpace: "nowrap",
    background: "0 0",
    fontFamily: "Lato,Helvetica Neue,Arial,Helvetica,sans-serif",
    fontSize: "1em",
    padding: ".4em 1em",
    fontWeight: 700,
    color: "rgba(0,0,0,.4)",
    borderBottom: "1px solid rgba(34,36,38,.1)"
  },
  results: {
    width: "100%",
    display: "table-cell",
    background: "#fff",
    borderLeft: "1px solid rgba(34,36,38,.15)",
    borderBottom: "2px solid rgba(34,36,38,.1)"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  progress: {
    position: "absolute",
    top: "100%",
    width: "18em",
    textAlign: "center",
    transformOrigin: "center top",
    background: "#fff",
    left: 0
  }
}))

export default function CustomizedInputBase({
  searchText,
  onTextChange,
  searchResults,
  isLoading
}) {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ "aria-label": "searchText" }}
          onChange={onTextChange}
        />
        <IconButton className={classes.iconButton} aria-label="search" />
      </Paper>
      {/* this is hardcoded for search to return an object */}
      {(!!Object.keys(searchResults).length || isLoading) && (
        <SearchResultsView
          searchResults={searchResults}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export function SearchResultsView({ searchResults, isLoading }) {
  const classes = useStyles()
  return (
    <>
      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress disableShrink />
        </div>
      ) : (
        <div className={classes.resultContent}>
          {Object.keys(searchResults).map(resultCategory => {
            const category = searchResults[resultCategory]
            if (category.length > 0) {
              return (
                <div className={classes.category} key={resultCategory}>
                  <div className={classes.name}>{category[0].__typename}</div>
                  <div className={classes.results}>
                    {category.map(content => (
                      <Grid item xs={12} key={content.__id}>
                        <Paper className={classes.paper}>
                          {resultCategory === "searchCreator"
                            ? content.name
                            : content.title}
                        </Paper>
                      </Grid>
                    ))}
                  </div>
                </div>
              )
            }
            return <></>
          })}
        </div>
      )}
    </>
  )
}
