import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import cx from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle'
import { SET_SELECTED_PAGE } from '../../store/ui'
import NotificationMenu from '../../components/Notifications/NotificationMenu'
import SettingsMenu from '../../components/Settings/SettingsMenu'

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.

function SidebarWrapper(props) {
  const { className, user, headerLinks, links } = props
  return (
    <Grid container direction="row">
      <div className={className}>
        {user}
        {headerLinks}
        {links}
      </div>
    </Grid>
  )
}

const MenuSidebar = (props) => {
  const {
    classes,
    routes,
    bgColor,
    rtlActive,
    currentRoute,
    open,
    handleDrawerToggle,
    dispatch,
    history,
    miniActive: propsMiniActive,
    color,
  } = props

  // State management
  const [openAvatar, setOpenAvatar] = useState(false)
  const [miniActive, setMiniActive] = useState(true)
  const [MessageDisplay, setMessageDisplay] = useState(null)
  const [collapseStates, setCollapseStates] = useState({})

  // Initialize collapse states on mount
  useEffect(() => {
    setCollapseStates(getCollapseStates(routes))
  }, [routes])

  // Helper functions
  const getCollapseStates = (routes) => {
    let initialState = {}
    routes.forEach((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        }
      }
    })
    return initialState
  }

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularFormsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true
      }
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true
      }
    }
    return false
  }

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) =>
    window.location.href.indexOf(routeName) > -1 ? 'active' : ''

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createGuestLinks = () => {
    return [
      <ListItem key="logo">
        <img
          src="/icons/android-chrome-192x192.png"
          alt="QuoteVote Logo"
          style={{ height: '30px', width: 'auto' }}
        />
      </ListItem>,
      <ListItem key="donate">
        <a
          href="https://donate.stripe.com/28E5kF6Egdaz9ZF6nhdfG00"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'block' }}
        >
          Donate
        </a>
      </ListItem>,
      <ListItem key="volunteer">
        <a
          href="mailto:volunteer@quote.vote"
          style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'block' }}
        >
          Volunteer
        </a>
      </ListItem>,
      <ListItem key="github">
        <a
          href="https://github.com/QuoteVote/quotevote-monorepo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'block' }}
        >
          GitHub
        </a>
      </ListItem>,
      <ListItem key="request-invite">
        <a
          onClick={() => history.push('/auth/request-access')}
          style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'block', cursor: 'pointer' }}
        >
          Request Invite
        </a>
      </ListItem>,
      <ListItem key="login">
        <a
          onClick={() => history.push('/auth/login')}
          style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'block', cursor: 'pointer' }}
        >
          Login
        </a>
      </ListItem>,
    ]
  }

  const createLinks = (routes) => {
    const loggedIn = !!localStorage.getItem('token')
    const guestLinks = !loggedIn ? createGuestLinks() : []
    const routeLinks = loggedIn
      ? routes.map((prop, key) => {
          if (prop.path === '/post') return null
          if (prop.path === 'Home') return null
          if (prop.redirect) {
            return null
          }
          if (prop.collapse) {
            return (
              <ListItem
                key={key}
                className={cx(
                  { [classes.item]: prop.icon !== undefined },
                  { [classes.collapseItem]: prop.icon === undefined },
                )}
              >
                <Collapse in={collapseStates[prop.state]} unmountOnExit>
                  <List className={`${classes.list} ${classes.collapseList}`}>
                    {createLinks(prop.views)}
                  </List>
                </Collapse>
              </ListItem>
            )
          }
          const innerNavLinkClasses = `${classes.collapseItemLink} ${cx({
            [` ${classes[color]}`]: activeRoute(prop.path),
          })}`
          const collapseItemMini = `${classes.collapseItemMini} ${cx({
            [classes.collapseItemMiniRTL]: rtlActive,
          })}`
          const navLinkClasses = `${classes.itemLink} ${cx({
            [` ${classes[color]}`]: activeRoute(prop.path),
          })}`
          const itemText = `${classes.itemText} ${cx({
            [classes.itemTextMini]:
              propsMiniActive && miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && propsMiniActive && miniActive,
            [classes.itemTextRTL]: rtlActive,
          })}`
          const collapseItemText = `${classes.collapseItemText} ${cx({
            [classes.collapseItemTextMini]:
              propsMiniActive && miniActive,
            [classes.collapseItemTextMiniRTL]:
              rtlActive && propsMiniActive && miniActive,
            [classes.collapseItemTextRTL]: rtlActive,
          })}`
          const itemIcon = `${classes.itemIcon} ${cx({
            [classes.itemIconRTL]: rtlActive,
          })}`
          return (
            <ListItem
              key={key}
              className={cx(
                { [classes.item]: prop.icon !== undefined },
                { [classes.collapseItem]: prop.icon === undefined },
              )}
            >
              <NavLink
                to={prop.layout + prop.path}
                className={cx(
                  { [navLinkClasses]: prop.icon !== undefined },
                  { [innerNavLinkClasses]: prop.icon === undefined },
                )}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {prop.icon !== undefined ? (
                  typeof prop.icon === 'string' ? (
                    <img
                      alt=""
                      src={prop.icon}
                      className={itemIcon}
                      style={{ height: '30px' }}
                    />
                  ) : (
                    /** <Icon className={itemIcon}>{prop.icon}</Icon> */
                    <prop.icon className={itemIcon} />
                  )
                ) : (
                  <span className={collapseItemMini}>
                    {rtlActive ? prop.rtlMini : prop.mini}
                  </span>
                )}
                {prop.name !== 'My Profile' && (
                  <ListItemText
                    primary={rtlActive ? prop.rtlName : prop.name}
                    disableTypography
                    className={cx(
                      { [itemText]: prop.icon !== undefined },
                      { [collapseItemText]: prop.icon === undefined },
                    )}
                  />
                )}
              </NavLink>
            </ListItem>
          )
        })
      : []
    return [...guestLinks, ...routeLinks]
  }

  const links = (
    <List className={classes.list}>{createLinks(routes)}</List>
  )

  const guestLinks = (
    <List className={classes.list}>{createGuestLinks()}</List>
  )

  const drawerPaper = `${classes.drawerPaper} ${cx({
    [classes.drawerPaperMini]: propsMiniActive && miniActive,
    [classes.drawerPaperRTL]: rtlActive,
  })}`
  const sidebarWrapper = `${classes.sidebarWrapper} ${cx({
    [classes.drawerPaperMini]: propsMiniActive && miniActive,
    [classes.sidebarWrapperWithPerfectScrollbar]:
      navigator.platform.indexOf('Win') > -1,
  })}`

  const handleDrawerOpen = () => {
    handleDrawerToggle(true)
  }
  const handleVoxPop = () => {
    dispatch(SET_SELECTED_PAGE(0))
    history.push('/search')
  }

  const loggedIn = !!localStorage.getItem('token')

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Left: Only menu icon */}
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item> 
              <img
                src="/icons/android-chrome-192x192.png"
                alt="QuoteVote Logo"
                style={{ height: '30px', width: 'auto' }}
              />
            </Grid>

            {/* Right: Empty for guests, user menu for logged in */}

            {loggedIn && (
              <Grid item>
                <Grid container>
                  <Grid item>
                    <NotificationMenu />
                  </Grid>
                  <Grid item>
                    <SettingsMenu />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor={rtlActive ? 'left' : 'right'}
        open={open}
        classes={{
          paper: `${drawerPaper} ${classes[bgColor + 'Background']}`,
        }}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        SlideProps={{
          direction: 'right',
        }}
      >
        <Grid container direction="row">
          <SidebarWrapper
            className={sidebarWrapper}
            MiniActive={MessageDisplay}
            links={loggedIn ? links : guestLinks}
            currentRoute={currentRoute}
            isLoggedIn={loggedIn}
          />
        </Grid>
      </Drawer>
    </>
  )
}

MenuSidebar.defaultProps = {
  bgColor: 'blue',
}

MenuSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'rose',
  ]),
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  currentRoute: PropTypes.any,
}

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
}

export default withRouter(withStyles(sidebarStyle)(MenuSidebar))
