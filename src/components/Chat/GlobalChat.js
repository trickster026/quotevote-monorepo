import React, { PureComponent } from "react"
import { withApollo } from "react-apollo"
import { connect } from "react-redux"
import GlobalMaximized from "../../components/Chat/GlobalMaximized"
import Minimized from "../../components/Chat/Minimized"
import { FixedWrapper, ThemeProvider } from "@livechat/ui-kit"

class GlobalChat extends PureComponent {
  render = () => {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return (
        <ThemeProvider>
          <FixedWrapper.Root maximizedOnInit>
            <FixedWrapper.Maximized active={true}>
              <GlobalMaximized {...this.props} />
            </FixedWrapper.Maximized>
            <FixedWrapper.Minimized active={false}>
              <Minimized {...this.props} />
            </FixedWrapper.Minimized>
          </FixedWrapper.Root>
        </ThemeProvider>
      )
    }
    return null
  }
}

const mapStateToProps = ({ login: { isLoggedIn } }) => ({
  isLoggedIn
})

GlobalChat.propTypes = {}

export default withApollo(connect(mapStateToProps)(GlobalChat))
