import React from "react"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"
import Card from "material-ui/components/Card/Card"
import CardHeader from "material-ui/components/Card/CardHeader"
import CardBody from "material-ui/components/Card/CardBody"

export default function SearchResultsView({ searchResults, isLoading }) {
    const classes = sty()
    return (
        <div style={{ zIndex: 10, overflowY: "scroll", height: "100%", maxHeight: "100%" }}>
            {isLoading ? (
                <Card className={classes.progress}>
                    <CircularProgress disableShrink />
                </Card>
            ) : (
                    <>
                        {Object.keys(searchResults).map((resultCategory, id) => {
                            const category = searchResults[resultCategory]
                            if (category.length > 0) {
                                return (
                                    <Card
                                        className={classes.category}
                                        key={`${resultCategory}${id}`}
                                        style={{ zIndex: 10 }}
                                    >
                                        <CardHeader className={classes.name}>{category[0].__typename}</CardHeader>
                                        <CardBody className={classes.results}>
                                            {category.map(content => (
                                                <Grid item xs={12} key={content.__id} className={classes.elevation1}>
                                                    {resultCategory === "searchCreator"
                                                        ? content.name
                                                        : content.title}
                                                </Grid>
                                            ))}
                                        </CardBody>
                                    </Card>
                                )
                            }
                            return <></>
                        })}
                    </>
                )}
        </div>
    )
}

const sty = makeStyles({
    progress: {
        background: "white",
        zIndex: 20
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
    category: {
        display: "flex",
        flexDirection: "column",
        background: "#f3f4f5"
    },
    elevation1: {
        borderBottom: "1px solid #f3f4f5",
        padding: "20px",
        "& :last-child": {
            border: "none"
        }
    }
})