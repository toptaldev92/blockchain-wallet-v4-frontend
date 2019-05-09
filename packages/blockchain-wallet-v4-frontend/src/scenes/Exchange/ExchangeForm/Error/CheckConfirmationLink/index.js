import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from 'data'
import { Link } from 'blockchain-info-components'

const CheckConfirmationLink = props => (
  <React.Fragment>
    <Link
      size='12px'
      weight={400}
      onClick={props.actions.recheckLatestTx}
      data-e2e='retryLink'
    >
      {props.children}
    </Link>
  </React.Fragment>
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.exchange, dispatch)
})

export default connect(
  undefined,
  mapDispatchToProps
)(CheckConfirmationLink)
