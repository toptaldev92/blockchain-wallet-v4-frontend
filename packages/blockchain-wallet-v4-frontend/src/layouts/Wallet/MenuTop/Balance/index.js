import React from 'react'
import { connect } from 'react-redux'
import { any, append, filter, head, keys, toUpper } from 'ramda'

import { getData } from './selectors'
import Template from './template'

class Balance extends React.PureComponent {
  render () {
    const { path, supportedCoins } = this.props
    const coins = append('LOCKBOX', keys(supportedCoins))
    const coinOrRoute = head(
      filter(
        path => any(coin => coin === toUpper(path))(coins),
        path.split('/')
      )
    )
    return (
      <Template
        coinOrRoute={coinOrRoute || 'TOTAL'}
        supportedCoins={supportedCoins}
      />
    )
  }
}

const mapStateToProps = state => getData(state)

export default connect(mapStateToProps)(Balance)
