import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { propOr } from 'ramda'
import { Text } from 'blockchain-info-components'
import { selectors } from 'data'

import CoinTicker from './CoinTicker'

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-top: 8px;
  z-index: 1;
`
const Header = styled(Text).attrs({
  size: '12px'
})`
  margin-bottom: 8px;
`

class CoinCurrentPrice extends React.PureComponent {
  render () {
    const { priceChart } = this.props
    const coin = propOr('BTC', 'coin', priceChart)

    return (
      <Wrapper>
        <Header>
          <FormattedMessage
            id='scenes.home.pricechart.coincurrentprice.currentprice'
            defaultMessage='Current Price'
          />
        </Header>
        <CoinTicker coin={coin} data-e2e={`coinTicker${coin}`} />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  priceChart: selectors.preferences.getPriceChart(state)
})

export default connect(mapStateToProps)(CoinCurrentPrice)
