import { FormattedMessage } from 'react-intl'
import { Text } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 7px 0;
  margin-top: 15px;
  text-align: center;
  border-top: 1px solid ${props => props.theme['gray-1']};
`

const Template = props => (
  <Wrapper>
    <Text
      size='11px'
      color='blue600'
      onClick={props.toggleCoinDisplayed}
      data-e2e='balanceDropdown-currency-switch'
    >
      {props.coinDisplayed ? (
        <FormattedMessage
          id='layouts.wallet.menutop.balance.walletbalance.showfiat'
          defaultMessage='Show {currency}'
          values={{ currency: props.currency }}
        />
      ) : (
        <FormattedMessage
          id='layouts.wallet.menutop.balance.walletbalance.showcrypto'
          defaultMessage='Show Crypto'
        />
      )}
    </Text>
  </Wrapper>
)

export default Template
