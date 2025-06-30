import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import { useHistory, useLocation } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'
import { useQuery } from '@apollo/react-hooks'
import SignupForm from '../../components/SignupForm/SignupForm'
import { VERIFY_PASSWORD_RESET_TOKEN } from '../../graphql/query'
import LoadingSpinner from '../../components/LoadingSpinner'

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

  if (loadingData) return <LoadingSpinner />

  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <SignupForm user={user} token={token} />
        <div style={{ marginTop: 20 }}>
          {/* Stripe payment form */}
          <stripe-buy-button
            buy-button-id="buy_btn_1RY6bhP3PjIJfZEbu5CpTDjo"
            publishable-key="pk_live_51RXriSP3PjIJfZEb1tqnEGBOGFZBHREUxqWHeO22GASJ5It6MKfpakOE3oDtL7II20j5idUR6NuXrBlaKXvszY6q00nn8KxROy"
          />
        </div>
      </GridContainer>
    </div>
  )
}
