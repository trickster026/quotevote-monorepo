import React, { PureComponent } from "react"
import { withApollo } from "react-apollo"
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react"
import { func, object } from "prop-types"
import { connect } from "react-redux"
import {
  userLogin,
  userLogout
} from "../../actions/creators/loginActionCreator"

export class Login extends PureComponent {
  state = {}

  static propTypes = {
    submit: func,
    user: object
  }

  static defaultProps = {
    user: {}
  }

  componentWillMount() {
    if (this.props.location.pathname === "/logout") {
      this.props.logout(this.props.history)
    }

    let times = 0
    const interval = setInterval(() => {
      times += 1
      if (this.state.username) {
        this.password.setState({ ...this.state.password, hasValue: true })
        clearInterval(interval)
      } else if (times >= 10) {
        clearInterval(interval)
      }
    }, 100)
  }

  handleInputs = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    const { username, password } = this.state
    this.props.submit(username, password, this.props.history)
    event.preventDefault()
  }

  handleFormSubmit = event => {
    if (event.key === "Enter") {
      this.handleSubmit(event)
    }
  }

  render = () => {
    let loginFailed =
      "error" in this.props.login &&
      typeof this.props.login.error !== "undefined"
    let errorMessage = loginFailed ? this.props.login.error.data.message : ""

    loginFailed = loginFailed && errorMessage !== ""

    return (
      <Segment as={Container} basic>
        <Grid centered>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" onKeyPress={this.handleFormSubmit}>
              <Segment stacked>
                <Message
                  error
                  header="Authentication Failed"
                  content={errorMessage}
                  visible={loginFailed}
                />
                <Form.Input
                  name="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleInputs}
                  error={loginFailed}
                  autoComplete="off"
                />
                <Form.Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleInputs}
                  error={loginFailed}
                  autoComplete="off"
                />

                <Button
                  color="grey"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                  loading={this.props.login.loading}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/signup">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => ({
  submit: (username, password, history) => {
    dispatch(userLogin(username, password, history))
  },
  logout: history => {
    dispatch(userLogout(history))
  }
})

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Login))
