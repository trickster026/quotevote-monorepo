import React from 'react'
import { userLogin } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Login from '../../components/Login/Login'

export default function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (values) => {
    const { username, password } = values
    setLoading(true)
    await userLogin(username, password, dispatch, history)
    setLoading(false)
  }

  return <Login onSubmit={handleSubmit} loading={loading} />
}
