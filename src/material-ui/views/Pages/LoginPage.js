import React from "react"

// @material-ui/core material-ui/components
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Icon from "@material-ui/core/Icon"

// @material-ui/icons
import Face from "@material-ui/icons/Face"
import Email from "@material-ui/icons/Email"
// import LockOutline from "@material-ui/icons/LockOutline";

// core material-ui/components
import GridContainer from "material-ui/components/Grid/GridContainer.js"
import GridItem from "material-ui/components/Grid/GridItem.js"
import CustomInput from "material-ui/components/CustomInput/CustomInput.js"
import Button from "material-ui/components/CustomButtons/Button.js"
import Card from "material-ui/components/Card/Card.js"
import CardBody from "material-ui/components/Card/CardBody.js"
import CardHeader from "material-ui/components/Card/CardHeader.js"
import CardFooter from "material-ui/components/Card/CardFooter.js"

import styles from "material-ui/assets/jss/material-dashboard-pro-react/views/loginPageStyle.js"

const useStyles = makeStyles(styles)

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden")
  setTimeout(function() {
    setCardAnimation("")
  }, 700)
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    )
                  })}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="First Name.."
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block>
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  )
}
