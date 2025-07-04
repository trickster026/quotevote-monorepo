import PropTypes from 'prop-types'
import cx from 'classnames'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import styles from 'assets/jss/material-dashboard-pro-react/components/footerStyle'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(styles)

export default function Footer(props) {
  const classes = useStyles()
  const { fluid, white } = props
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          justify={isMobile ? 'flex-start' : 'space-between'}
          alignItems="center"
        >
          <Grid item xs={12} sm={9} style={isMobile ? { textAlign: 'left', marginBottom: 8 } : {}}>
            <Typography>
              Quote.Vote made with ❤️ on Earth
              <div className={classes.grow} />
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            lg={3}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 8 : 0,
              textAlign: isMobile ? 'left' : 'right',
            }}
          >
            <Link
              href="/auth/request-access"
              color="inherit"
              style={isMobile ? { margin: 0 } : { marginRight: '1rem' }}
            >
              <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                Request Invite
              </Typography>
            </Link>
            <Link
              href="https://donate.stripe.com/28E5kF6Egdaz9ZF6nhdfG00"
              color="inherit"
              style={isMobile ? { margin: 0 } : { marginLeft: '1rem' }}
            >
              <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                Donate
              </Typography>
            </Link>
            <Link
              href="https://github.com/QuoteVote/quotevote-monorepo"
              color="inherit"
              style={isMobile ? { margin: 0 } : { marginLeft: '1rem' }}
            >
              <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                GitHub
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
}
