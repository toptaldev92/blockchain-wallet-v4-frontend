import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector, getFormMeta } from 'redux-form'

import Login from './template.js'
import { actions, selectors } from 'data'
import { isGuid, isEmail } from '../../services/ValidationHelper'

class LoginContainer extends React.PureComponent {
  state = { useCode: true }

  componentDidMount () {
    this.props.loginActions.initialized()
  }

  componentWillUnmount () {
    this.props.formActions.reset('login')
  }

  onSubmit = () => {
    const { guid, password, code } = this.props
    let auth = code
    // only uppercase if authType is not Yubikey
    if (auth && this.props.authType !== 1) {
      auth = auth.toUpperCase()
    }
    this.props.authActions.login(guid, password, auth)
  }

  handleMobile = () => {
    this.props.modalActions.showModal('MobileLogin')
  }

  handleSmsResend = () => {
    this.props.authActions.resendSmsCode(this.props.guid)
  }

  render () {
    const { authType, data, lastGuid } = this.props

    const { busy, error } = data.cata({
      Success: () => ({ error: null, busy: false }),
      Failure: val => ({ error: val.err, busy: false }),
      Loading: () => ({ error: null, busy: true }),
      NotAsked: () => ({ error: null, busy: false })
    })

    const loginProps = {
      busy,
      authType,
      loginError: error,
      onSubmit: this.onSubmit,
      handleMobile: this.handleMobile,
      handleSmsResend: this.handleSmsResend
    }

    const path =
      this.props.location.pathname && this.props.location.pathname.split('/')[2]
    const guid = (isGuid(path) && path) || lastGuid

    return guid ? (
      <Login {...this.props} initialValues={{ guid }} {...loginProps} />
    ) : (
      <Login {...this.props} {...loginProps} />
    )
  }
}

const mapStateToProps = state => ({
  code: formValueSelector('login')(state, 'code'),
  guid: formValueSelector('login')(state, 'guid'),
  password: formValueSelector('login')(state, 'password'),
  formMeta: getFormMeta('login')(state),
  authType: selectors.auth.getAuthType(state),
  lastGuid: selectors.cache.getLastGuid(state),
  data: selectors.auth.getLogin(state),
  isGuidValid: isGuid(formValueSelector('login')(state, 'guid')),
  isGuidEmailAddress: isEmail(formValueSelector('login')(state, 'guid'))
})

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(actions.auth, dispatch),
  alertActions: bindActionCreators(actions.alerts, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  loginActions: bindActionCreators(actions.components.login, dispatch),
  modalActions: bindActionCreators(actions.modals, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
