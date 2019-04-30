import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import { actions } from 'data'
import { Link } from 'blockchain-info-components'

const LimitsUpdateLink = props => (
  <Link
    size='12px'
    weight={400}
    onClick={props.actions.updateLimits}
    data-e2e='retryLink'
  >
    <FormattedMessage
      id='scenes.exchange.exchangeform.tryagain'
      defaultMessage='Try again'
    />
  </Link>
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.exchange, dispatch)
})

export default connect(
  undefined,
  mapDispatchToProps
)(LimitsUpdateLink)
