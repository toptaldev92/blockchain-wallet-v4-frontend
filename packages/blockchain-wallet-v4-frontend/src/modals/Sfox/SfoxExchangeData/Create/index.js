import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { path } from 'ramda'

import Create from './template'
import { actions, selectors } from 'data'
import { getData } from './selectors'

class CreateContainer extends Component {
  state = {
    create: '',
    uniqueEmail: true,
    editVerifiedEmail: false,
    editVerifiedMobile: false
  }

  componentDidMount () {
    if (this.props.emailVerified && this.props.smsVerified) {
      this.setState({ create: 'create_account' })
    } else if (this.props.emailVerified) {
      this.setState({ create: 'change_mobile' })
    } else this.setState({ create: 'enter_email_code' })
  }

  render () {
    return (
      <Create
        create={this.state.create}
        countryCode={this.props.data.countryCode}
        editVerifiedEmail={this.state.editVerifiedEmail}
        editVerifiedMobile={this.state.editVerifiedMobile}
        editEmail={() => {
          this.setState({
            create: 'change_email',
            editVerifiedEmail: true
          })
        }}
        editMobile={() => {
          this.setState({
            create: 'change_mobile',
            editVerifiedMobile: true
          })
        }}
        needsChangeEmail={() =>
          this.setState({ create: 'change_email', uniqueEmail: false })
        }
        {...this.props}
      />
    )
  }
}

CreateContainer.propTypes = {
  smsVerified: PropTypes.number.isRequired,
  emailVerified: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  data: getData(state),
  smsVerified: selectors.core.settings.getSmsVerified(state).getOrElse(0),
  emailVerified: selectors.core.settings.getEmailVerified(state).getOrElse(0),
  emailVerifiedError: path(['securityCenter', 'emailVerifiedError'], state),
  mobileVerifiedError: path(['securityCenter', 'mobileVerifiedError'], state)
})

const mapDispatchToProps = dispatch => ({
  formActions: bindActionCreators(actions.form, dispatch),
  sfoxFrontendActions: bindActionCreators(actions.modules.sfox, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContainer)
