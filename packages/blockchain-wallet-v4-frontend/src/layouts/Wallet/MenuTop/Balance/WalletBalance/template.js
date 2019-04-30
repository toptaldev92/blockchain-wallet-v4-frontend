import React from 'react'
import { FormattedMessage } from 'react-intl'
import { map } from 'ramda'

import Balance from './Balance'
import { Icon } from 'blockchain-info-components'
import {
  Wrapper,
  BalancesWrapper,
  Header,
  HeaderText
} from 'components/Balances'

const Template = props => {
  const { supportedCoins } = props
  const coinOrder = [
    supportedCoins.PAX,
    supportedCoins.BTC,
    supportedCoins.ETH,
    supportedCoins.BCH,
    supportedCoins.XLM
  ]

  return (
    <Wrapper>
      <Header onClick={props.handleToggle} data-e2e='balanceDropdown-wallet'>
        <HeaderText size='14px'>
          <Icon name='wallet' size='12px' style={{ marginRight: '10px' }} />
          <FormattedMessage
            id='layouts.wallet.menutop.balance.walletbalance.wallet'
            defaultMessage='Wallet'
          />
        </HeaderText>
        <Icon
          name='caret'
          size='10px'
          className={props.isActive ? 'active' : ''}
        />
      </Header>
      <BalancesWrapper className={props.isActive ? 'active' : ''}>
        {map(
          coin =>
            coin.invited && (
              <Balance coin={coin.coinCode} coinTicker={coin.coinTicker} />
            ),
          coinOrder
        )}
      </BalancesWrapper>
    </Wrapper>
  )
}

export default Template
