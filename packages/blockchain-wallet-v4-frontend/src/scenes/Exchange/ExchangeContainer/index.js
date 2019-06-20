import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from 'data'
import ExchangeForm from '../ExchangeForm'

export class ExchangeContainer extends React.PureComponent {
  componentDidMount () {
    this.props.profileActions.fetchUser()
  }

  componentWillUnmount () {
    this.props.actions.clearSubscriptions()
  }

  render () {
    const { from, to, fix, amount } = this.props
    return <ExchangeForm {...{ from, to, fix, amount }} />
  }
}

ExchangeContainer.propTypes = {
  step: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.exchange, dispatch),
  routerActions: bindActionCreators(actions.router, dispatch),
  profileActions: bindActionCreators(actions.modules.profile, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(ExchangeContainer)
