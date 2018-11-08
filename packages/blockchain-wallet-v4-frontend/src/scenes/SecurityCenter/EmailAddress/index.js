import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'data'
import { formValueSelector } from 'redux-form'

import { getData } from './selectors'
import Error from './template.error'
import Loading from './template.loading'
import Success from './template.success'

class EmailAddressContainer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      updateToggled: false,
      verifyToggled: false,
      successToggled: false,
      changeEmailToggled: false
    }

    this.handleResend = this.handleResend.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleVerifyClick = this.handleVerifyClick.bind(this)
    this.handleChangeEmailView = this.handleChangeEmailView.bind(this)
    this.handleEmailChangeCancel = this.handleEmailChangeCancel.bind(this)
    this.handleEmailChangeSubmit = this.handleEmailChangeSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.changeEmail) {
      this.handleChangeEmailView()
    }
  }

  componentDidUpdate (prevProps) {
    const next = this.props.data.getOrElse({})
    const prev = prevProps.data.getOrElse({})
    if (next.verified && !prev.verified) {
      this.handleUpdate()
      prevProps.goBackOnSuccess()
    }
  }

  handleUpdate () {
    this.setState({
      successToggled: false,
      verifyToggled: !this.state.verifyToggled
    })
  }

  handleVerifyClick () {
    this.handleResend()
  }

  handleResend () {
    const { email } = this.props.data.getOrElse({})
    this.props.securityCenterActions.resendVerifyEmail(email)
  }

  handleChangeEmailView () {
    const { email } = this.props.data.getOrElse({})
    this.setState({
      changeEmailToggled: !this.state.changeEmailToggled
    })
    this.props.formActions.change('securityEmailAddress', 'changeEmail', email)
  }

  handleEmailChangeCancel () {
    this.setState({
      changeEmailToggled: !this.state.changeEmailToggled
    })
  }

  handleEmailChangeSubmit () {
    this.props.securityCenterActions.updateEmail(this.props.updatedEmail)
    this.setState({
      changeEmailToggled: !this.state.changeEmailToggled
    })
  }

  render () {
    const { data, ...rest } = this.props

    return data.cata({
      Success: value => (
        <Success
          {...rest}
          uiState={this.state}
          data={value}
          handleVerifyClick={this.handleVerifyClick}
          handleResend={this.handleResend}
          handleSubmitVerification={this.handleSubmitVerification}
          handleChangeEmailView={this.handleChangeEmailView}
          handleEmailChangeCancel={this.handleEmailChangeCancel}
          handleEmailChangeSubmit={this.handleEmailChangeSubmit}
        />
      ),
      Failure: message => <Error {...rest} message={message} />,
      Loading: () => <Loading {...rest} />,
      NotAsked: () => <Loading {...rest} />
    })
  }
}

const mapStateToProps = state => ({
  data: getData(state),
  code: formValueSelector('securityEmailAddress')(state, 'emailCode'),
  updatedEmail: formValueSelector('securityEmailAddress')(state, 'changeEmail')
})

const mapDispatchToProps = dispatch => ({
  settingsActions: bindActionCreators(actions.modules.settings, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  securityCenterActions: bindActionCreators(
    actions.modules.securityCenter,
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAddressContainer)
