import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import { useHistory, useLocation } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'
import { useQuery } from '@apollo/react-hooks'
import SignupForm from '../../components/SignupForm/SignupForm'
import { VERIFY_PASSWORD_RESET_TOKEN } from '../../graphql/query'
import LoadingSpinner from '../../components/LoadingSpinner'
import StripePaymentDialog from '../../components/StripePaymentDialog'

const useStyles = makeStyles(styles)

export default function SignupPage() {
  const history = useHistory()
  const { search } = useLocation()
  const params = Object.fromEntries(new URLSearchParams(search))
  const { token } = params || {}
  const { data, loading: loadingData } = useQuery(VERIFY_PASSWORD_RESET_TOKEN, {
    variables: { token },
  })
  const user = (data && data.verifyUserPasswordResetToken) || false
  const classes = useStyles()
  const [showPaymentDialog, setShowPaymentDialog] = React.useState(true)

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/buy-button.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  React.useEffect(() => {
    if (!loadingData && !user) history.push('/error')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingData, user])

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false)
  }

  if (loadingData) return <LoadingSpinner />

  return (
    <div className={classes.container}>
      <GridContainer justify="center" spacing={3} style={{ marginRight: 24 }}>
        <GridItem xs={12} sm={6} md={4}>
          <SignupForm user={user} token={token} />
        </GridItem>
      </GridContainer>
      
      <StripePaymentDialog 
        open={showPaymentDialog} 
        onClose={handleClosePaymentDialog} 
      />
    </div>
  )
}
