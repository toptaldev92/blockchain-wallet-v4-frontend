import React from 'react'

import BtcLockboxBalance from './BtcLockboxBalance'
import { FormattedMessage } from 'react-intl'
import { Text } from 'blockchain-info-components'
import { Wrapper, Header } from 'components/Balances'

const Template = props => (
  <Wrapper>
    <Header>
      <Text size='14px'>
        <FormattedMessage
          id='layouts.wallet.menutop.balance.walletbalance.Lockbox'
          defaultMessage='Lockbox'
        />
      </Text>
    </Header>
    <BtcLockboxBalance />
  </Wrapper>
)

export default Template
