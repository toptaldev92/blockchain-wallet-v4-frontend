import { actions, model, selectors } from 'data'
import { bindActionCreators } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import React from 'react'
import VerifyEmail from './template'

const { DISMISS_VERIFICATION, EMAIL_VERIFIED } = model.analytics.AB_TEST_EVENTS

class VerifyEmailContainer extends React.PureComponent<PropsType, {}> {
  state = {}

  static getDerivedStateFromProps (nextProps) {
    if (nextProps.isEmailVerified) {
      nextProps.authActions.setRegisterEmail(undefined)
      nextProps.routerActions.push('/home')
      nextProps.analyticsActions.logEvent(EMAIL_VERIFIED)
    }
    return null
  }

  onResendEmail = () => {
    const { securityCenterActions, email } = this.props
    securityCenterActions.resendVerifyEmail(email)
  }

  skipVerification = () => {
    this.props.authActions.setRegisterEmail(undefined)
    this.props.analyticsActions.logEvent(DISMISS_VERIFICATION)
    this.props.routerActions.push('/home')
  }

  render () {
    return (
      <VerifyEmail
        {...this.props}
        resendEmail={this.onResendEmail}
        skipVerification={this.skipVerification}
      />
    )
  }
}

const mapStateToProps = state => ({
  email: selectors.auth.getRegisterEmail(state),
  appEnv: selectors.core.walletOptions.getAppEnv(state).getOrElse('prod'),
  isEmailVerified: selectors.core.settings
    .getEmailVerified(state)
    .getOrElse(false)
})

const mapDispatchToProps = dispatch => ({
  miscActions: bindActionCreators(actions.core.data.misc, dispatch),
  securityCenterActions: bindActionCreators(
    actions.modules.securityCenter,
    dispatch
  ),
  routerActions: bindActionCreators(actions.router, dispatch),
  authActions: bindActionCreators(actions.auth, dispatch),
  analyticsActions: bindActionCreators(actions.analytics, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PropsType = ConnectedProps<typeof connector>

export default connector(VerifyEmailContainer)
