import React from "react"
import cx from "classnames"
import { Switch, Route, Redirect } from "react-router-dom"
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar"
import "perfect-scrollbar/css/perfect-scrollbar.css"

import GridContainer from "material-ui/components/Grid/GridContainer.js"
import GridItem from "material-ui/components/Grid/GridItem.js"
// @material-ui/core material-ui/components
import { makeStyles } from "@material-ui/core/styles"

// core material-ui/components
import AdminNavbar from "material-ui/components/Navbars/AdminNavbar.js"
import Footer from "material-ui/components/Footer/Footer.js"
import Sidebar from "../hhsbComponents/hhsbSidebar.js"
import FixedPlugin from "material-ui/components/FixedPlugin/FixedPlugin.js"

import hhsbRoutes from "../hhsbroutes.js"
import whitelogo from "../assets/img/logo-white.svg"
import SidebarIMG from "../assets/img/sidebar-2.jpg"
import logo from "../assets/img/logo.svg"
import styles from "material-ui/assets/jss/material-dashboard-pro-react/layouts/adminStyle.js"
import ContentFeed from "../hhsbviews/topcontent.js"
var ps

const useStyles = makeStyles(styles)

export default function ScoreBoard(props) {
  const { ...rest } = props
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [miniActive, setMiniActive] = React.useState(true)
  const [image, setImage] = React.useState(SidebarIMG)
  const [color, setColor] = React.useState("blue")
  const [bgColor, setBgColor] = React.useState("black")
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown")
  const [logo, setLogo] = React.useState(whitelogo)
  // styles
  const classes = useStyles()
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    })
  // ref for main panel div
  const mainPanel = React.createRef()
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      })
      document.body.style.overflow = "hidden"
    }
    window.addEventListener("resize", resizeFunction)

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy()
      }
      window.removeEventListener("resize", resizeFunction)
    }
  })
  // functions for changeing the states from material-ui/components
  const handleImageClick = image => {
    setImage(image)
  }
  const handleColorClick = color => {
    setColor(color)
  }
  const handleBgColorClick = bgColor => {
    switch (bgColor) {
      case "white":
        setLogo(require(logo))
        break
      default:
        setLogo(whitelogo)
        break
    }
    setBgColor(bgColor)
  }
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show")
    } else {
      setFixedClasses("dropdown")
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps"
  }
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text"
    for (let i = 0; i < routes.length; i++) {
      console.log(routes[i])
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          console.log(routes[i].name)
          return routes[i].name
        }
      }
    }
    console.log(activeRoute)

    return activeRoute
  }
  const getRoutes = routes => {
    console.log(routes)
    return routes.map((prop, key) => {
      console.log(prop)
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout) {
        console.log("*******************")
        console.log("The ROUTE IS HERE")
        console.log(prop.layout)
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  const sidebarMinimize = () => {
    setMiniActive(!miniActive)
    console.log("minimize *****************************************")
  }
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  }
  // This function retrieves the current view for the active route. The split should not be necesssary but as of the time of writing this, all routes are prepended by /home/
  const currentRoute = () => {
    const {
      location: { pathname }
    } = props
    let currLocation = pathname.split("/")
    return currLocation[currLocation.length - 1]
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={hhsbRoutes}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        currentRoute={currentRoute()}
        {...rest}
      />

      <div className={mainPanelClasses} ref={mainPanel}>
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(hhsbRoutes)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
              {/* Route */}
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(hhsbRoutes)}
              <Redirect from="/home" to="/admin/dashboard" />
            </Switch>
          </div>
        )}
      </div>
    </div>
  )
}
