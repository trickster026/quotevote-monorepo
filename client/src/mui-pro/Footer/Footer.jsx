import PropTypes from 'prop-types'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
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
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={9}>
            <Typography>
              Quote.Vote made with ❤️ on Earth
              <div className={classes.grow} />
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Link
              href="/auth/request-access"
              color="inherit"
              style={{ marginRight: '1rem' }}
            >
              <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                Request Invite
              </Typography>
            </Link>
            <Link
              href="https://donate.stripe.com/28E5kF6Egdaz9ZF6nhdfG00"
              color="inherit"
              style={{ marginLeft: '1rem' }}
            >
              <Typography style={{ fontSize: '14px', fontWeight: 400 }}>
                Donate
              </Typography>
            </Link>
            <Link
              href="https://github.com/QuoteVote/quotevote-monorepo"
              color="inherit"
              style={{ marginLeft: '1rem' }}
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
